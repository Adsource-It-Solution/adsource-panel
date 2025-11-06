"use client";

import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Box,
  Divider,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const roles = ["ngo", "solar", "billing"];

export default function AdminDashboard() {
  const [users, setUsers] = useState<any[]>([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: [] as string[],
  });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error" | "info",
  });

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [updateForm, setUpdateForm] = useState({
    name: "",
    email: "",
    password: "",
    role: [] as string[],
  });
  const [updating, setUpdating] = useState(false);

  // ✅ Fetch Users
  const fetchUsers = async () => {
    try {
      setFetching(true);
      const res = await fetch("/api/admin/get-users", {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) {
        setUsers(data.users);
      } else {
        showSnackbar(data.message || "Failed to fetch users", "error");
      }
    } catch (err) {
      console.error(err);
      showSnackbar("Error fetching users", "error");
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const showSnackbar = (
    message: string,
    severity: "success" | "error" | "info"
  ) => {
    setSnackbar({ open: true, message, severity });
  };

  // ✅ Add User
  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password || !form.role.length) {
      showSnackbar("Please fill all fields", "error");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/admin/add-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        showSnackbar("✅ User added successfully!", "success");
        setForm({ name: "", email: "", password: "", role: [] });
        fetchUsers();
      } else {
        showSnackbar(data.message || "Failed to add user", "error");
      }
    } catch (err) {
      console.error(err);
      showSnackbar("Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete User
  const handleDelete = (id: string) => {
    setSelectedUserId(id);
    setOpenDialog(true);
  };

  const confirmDelete = async () => {
    if (!selectedUserId) return;

    try {
      const res = await fetch(`/api/admin/delete-users/${selectedUserId}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) {
        showSnackbar("User deleted successfully", "success");
        fetchUsers();
      } else {
        showSnackbar(data.message || "Failed to delete user", "error");
      }
    } catch (err) {
      console.error(err);
      showSnackbar("Error deleting user", "error");
    } finally {
      setOpenDialog(false);
      setSelectedUserId(null);
    }
  };

  // ✅ Open Update Dialog
  const handleOpenUpdate = (user: any) => {
    setUpdateForm({
      name: user.name,
      email: user.email,
      password: "",
      role: Array.isArray(user.role) ? user.role : [user.role],
    });
    setSelectedUserId(user._id);
    setOpenUpdateDialog(true);
  };

  // ✅ Update User
  const handleUpdateUser = async () => {
    if (!selectedUserId) return;
    setUpdating(true);

    try {
      const res = await fetch(`/api/admin/update-user/${selectedUserId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(updateForm),
      });

      const data = await res.json();
      if (res.ok) {
        showSnackbar("✅ User updated successfully!", "success");
        fetchUsers();
        setOpenUpdateDialog(false);
      } else {
        showSnackbar(data.message || "Failed to update user", "error");
      }
    } catch (err) {
      console.error(err);
      showSnackbar("Error updating user", "error");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h4" fontWeight={700} textAlign="center" gutterBottom>
        Admin Dashboard
      </Typography>

      {/* Add User Form */}
      <Paper elevation={3} sx={{ p: 4, mb: 6 }}>
        <Typography variant="h6" gutterBottom>
          Add New User
        </Typography>

        <Box
          component="form"
          onSubmit={handleAddUser}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="Full Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <TextField
            label="Email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <TextField
            label="Password"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />

          <Typography variant="subtitle1" sx={{ mt: 2 }}>
            Roles
          </Typography>

          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            {roles.map((role) => {
              const isChecked = form.role.includes(role);
              return (
                <Box
                  key={role}
                  onClick={() => {
                    const updatedRoles = isChecked
                      ? form.role.filter((r) => r !== role)
                      : [...form.role, role];
                    setForm({ ...form, role: updatedRoles });
                  }}
                  sx={{
                    position: "relative",
                    cursor: "pointer",
                    p: 2,
                    width: 120,
                    textAlign: "center",
                    borderRadius: 3,
                    border: isChecked ? "2px solid #4CAF50" : "2px solid #ddd",
                    backgroundColor: isChecked ? "#e8f5e9" : "#f9f9f9",
                  }}
                >
                  {isChecked && (
                    <CheckCircleIcon
                      sx={{
                        color: "#4CAF50",
                        position: "absolute",
                        top: -10,
                        right: -10,
                      }}
                    />
                  )}
                  <Typography fontWeight="bold">{role}</Typography>
                </Box>
              );
            })}
          </Box>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
            sx={{ mt: 2 }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Add User"}
          </Button>
        </Box>
      </Paper>

      <Divider sx={{ mb: 4 }} />

      {/* User Table */}
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h6" gutterBottom>
          All Users
        </Typography>

        {fetching ? (
          <Box textAlign="center" py={4}>
            <CircularProgress />
          </Box>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><b>Name</b></TableCell>
                  <TableCell><b>Email</b></TableCell>
                  <TableCell><b>Role</b></TableCell>
                  <TableCell align="center"><b>Actions</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.length > 0 ? (
                  users.map((u) => (
                    <TableRow key={u._id}>
                      <TableCell>{u.name}</TableCell>
                      <TableCell>{u.email}</TableCell>
                      <TableCell>{Array.isArray(u.role) ? u.role.join(", ") : u.role}</TableCell>
                      <TableCell align="center">
                        <Button
                          variant="contained"
                          color="info"
                          size="small"
                          onClick={() => handleOpenUpdate(u)}
                          sx={{ mr: 1 }}
                        >
                          Update
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          size="small"
                          onClick={() => handleDelete(u._id)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} align="center">
                      No users found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>

      {/* Update User Dialog */}
      <Dialog open={openUpdateDialog} onClose={() => setOpenUpdateDialog(false)}>
        <DialogTitle>Update User</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Full Name"
            fullWidth
            value={updateForm.name}
            onChange={(e) => setUpdateForm({ ...updateForm, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Email"
            fullWidth
            value={updateForm.email}
            onChange={(e) => setUpdateForm({ ...updateForm, email: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            value={updateForm.password}
            onChange={(e) => setUpdateForm({ ...updateForm, password: e.target.value })}
            helperText="Leave blank to keep current password"
          />
          <Typography variant="subtitle1" sx={{ mt: 2 }}>
            Roles
          </Typography>
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mt: 1 }}>
            {roles.map((role) => {
              const isChecked = updateForm.role.includes(role);
              return (
                <Button
                  key={role}
                  variant={isChecked ? "contained" : "outlined"}
                  color={isChecked ? "success" : "inherit"}
                  onClick={() => {
                    const updatedRoles = isChecked
                      ? updateForm.role.filter((r) => r !== role)
                      : [...updateForm.role, role];
                    setUpdateForm({ ...updateForm, role: updatedRoles });
                  }}
                >
                  {role}
                </Button>
              );
            })}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenUpdateDialog(false)}>Cancel</Button>
          <Button
            onClick={handleUpdateUser}
            color="primary"
            variant="contained"
            disabled={updating}
          >
            {updating ? <CircularProgress size={20} color="inherit" /> : "Update"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete this user?</DialogContentText>
          <DialogContentText>This action cannot be undone.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
