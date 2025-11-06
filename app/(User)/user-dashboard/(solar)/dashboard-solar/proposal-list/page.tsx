"use client";
import { useState, useEffect } from "react";
import {
  Stack,
  Card,
  CardContent,
  Button,
  IconButton,
  CircularProgress,
  TextField
} from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import axios from "axios";
import { toast } from "react-toastify";
import { pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";

import type { Proposal } from "../proposal/page";
import { SolarProposalPDF } from "../pdf/page";
import { useRouter } from "next/navigation";

function ProposalList() {
  const router = useRouter();
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingPdf, setLoadingPdf] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState("");
  const [, setAllowed] = useState<boolean | null>(null);

  useEffect(() => {
    async function verifyAccess() {
      try {
        const res = await fetch("/api/auth/me");
        if (!res.ok) {
          router.replace("/login");
          return;
        }

        const data = await res.json();
        console.log("👤 User roles for route check:", data.role);

        const userRoles = Array.isArray(data.role) ? data.role : [data.role];
        const hasAccess = userRoles.includes("solar") || userRoles.includes("admin");

        if (!hasAccess) {
          console.warn("🚫 Unauthorized access — redirecting...");
          router.replace("/not-authorized");
          return;
        }

        setAllowed(true);
      } catch (err) {
        console.error("❌ Auth check failed:", err);
        router.replace("/login");
      }
    }

    verifyAccess();
  }, [router]);

  // Fetch active proposals
  const fetchProposals = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/solar/proposal`);
      const sorted = res.data.sort(
        (a: any, b: any) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setProposals(sorted);
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to fetch proposals");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProposals();
  }, []);

  // -------------------
  // Soft delete: move to recycle bin
  // -------------------
  const handleDelete = async (id?: string) => {
    if (!id) return;
    try {
      await axios.delete(`/api/solar/proposal/${id}`);
      toast.success("🗑️ Proposal moved to Recycle Bin");
      fetchProposals();
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to move proposal to Recycle Bin");
    }
  };

  // -------------------
  // Save updated heading
  // -------------------
  const handleSave = async (id: string | undefined) => {
    if (!id) return;
    try {
      await axios.put(`/api/solar/proposal/${id}`, { heading: newTitle });
      setProposals(prev =>
        prev.map(x => (x._id === id ? { ...x, heading: newTitle } : x))
      );
      setEditingId(null);
      setNewTitle("");
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to update proposal");
    }
  };

  // -------------------
  // Download PDF
  // -------------------
  const handleDownloadPdf = async (proposal: Proposal) => {
    try {
      setLoadingPdf(proposal._id || null);
      const blob = await pdf(<SolarProposalPDF proposal={proposal} />).toBlob();
      saveAs(blob, `proposal_${proposal._id}.pdf`);
      toast.success("✅ PDF generated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to generate PDF");
    } finally {
      setLoadingPdf(null);
    }
  };

  return (
    <div className="mx-5 my-5">
      {loading ? (
        <div className="flex justify-center py-10">
          <CircularProgress />
        </div>
      ) : (
        <Stack spacing={2}>
          {proposals.length === 0 && (
            <p className="border border-slate-600 flex justify-center py-3">
              ❌ No proposals added yet.
            </p>
          )}

          {proposals.map((p, index) => (
            <Card key={p._id}>
              <CardContent>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <div>
                    {editingId === p._id ? (
                      <div className="flex items-center gap-2">
                        <TextField
                          value={newTitle}
                          onChange={(e) => setNewTitle(e.target.value)}
                          size="small"
                          variant="outlined"
                          autoFocus
                        />
                        <IconButton onClick={() => handleSave(p._id)}>
                          <Button color="success" variant="contained">
                            <SaveIcon />
                          </Button>
                        </IconButton>
                        <IconButton
                          onClick={() => {
                            setEditingId(null);
                            setNewTitle("");
                          }}
                        >
                          <Button color="error" variant="contained">
                            <CancelIcon />
                          </Button>
                        </IconButton>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-lg">
                          {p.heading ? p.heading : `Proposal: ${index + 1}`}
                        </h3>
                        <IconButton
                          onClick={() => {
                            setEditingId(p._id ?? null);
                            setNewTitle(p.heading || `Proposal: ${index + 1}`);
                          }}
                        >
                          <EditIcon color="primary" />
                        </IconButton>
                      </div>
                    )}
                    <h3 className="font-bold text-lg">{p.clientName}</h3>
                    <p>Created at: <span className="text-base font-semibold">{p.date ? new Date(p.date).toLocaleDateString("en-GB") : "N/A"}</span></p>
                    <p>Phone no.: <span className="text-base font-semibold">{p.clientPhone}</span></p>
                    <p>Email: <span className="text-base font-semibold">{p.clientEmail}</span></p>
                    <p>Address: <span className="text-base font-semibold">{p.clientAddress}</span></p>
                    <p className="text-lg">✅ Proposal Created!</p>
                  </div>

                  <Stack direction="row" spacing={4}>
                    <Button variant="outlined" color="primary" onClick={() => router.push(`/proposal/${p._id}`)}>
                      Edit <EditIcon sx={{ marginLeft: 1 }} />
                    </Button>
                    <IconButton color="primary" onClick={() => handleDownloadPdf(p)} disabled={loadingPdf === p._id}>
                      {loadingPdf === p._id ? <CircularProgress size={24} color="inherit" /> : <PictureAsPdfIcon />}
                    </IconButton>
                    <Button color="error" variant="contained" onClick={() => handleDelete(p._id)} disabled={loadingPdf === p._id}>
                      <DeleteIcon />
                    </Button>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Stack>
      )}
    </div>
  );
}

export default ProposalList;
