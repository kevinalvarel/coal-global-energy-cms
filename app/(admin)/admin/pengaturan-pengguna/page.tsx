import { PlusIcon } from "lucide-react";

import { PageHeader } from "@/components/admin/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const users = [
  {
    id: 1,
    name: "Admin Utama",
    email: "admin@coalglobalenergy.com",
    role: "Admin",
    status: "Aktif",
  },
  {
    id: 2,
    name: "Budi Santoso",
    email: "budi@coalglobalenergy.com",
    role: "Editor",
    status: "Aktif",
  },
  {
    id: 3,
    name: "Sari Wulandari",
    email: "sari@coalglobalenergy.com",
    role: "Editor",
    status: "Aktif",
  },
  {
    id: 4,
    name: "Rina Pratama",
    email: "rina@coalglobalenergy.com",
    role: "Kontributor",
    status: "Nonaktif",
  },
];

export default function PengaturanPenggunaPage() {
  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <PageHeader
        title="Pengaturan Pengguna"
        description="Kelola akses dan peran anggota tim."
      >
        <Button type="button">
          <PlusIcon />
          Tambah Pengguna
        </Button>
      </PageHeader>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Pengguna</CardTitle>
          <CardDescription>{users.length} pengguna terdaftar</CardDescription>
        </CardHeader>
        <CardContent className="px-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-4 md:pl-6">Nama</TableHead>
                <TableHead className="hidden md:table-cell">Email</TableHead>
                <TableHead>Peran</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="pl-4 font-medium md:pl-6">
                    {user.name}
                  </TableCell>
                  <TableCell className="hidden text-muted-foreground md:table-cell">
                    {user.email}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{user.role}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={user.status === "Aktif" ? "default" : "secondary"}
                    >
                      {user.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
