"use client";

import { useMemo, useState } from "react";
import {
  EllipsisVerticalIcon,
  PencilIcon,
  SearchIcon,
  Trash2Icon,
} from "lucide-react";

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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export type PostStatus = "Publikasi" | "Draf" | "Terjadwal";

const posts: {
  id: number;
  title: string;
  category: string;
  status: PostStatus;
  author: string;
  date: string;
}[] = [
  {
    id: 1,
    title: "Ekspor Batubara Indonesia Meningkat",
    category: "Berita",
    status: "Publikasi",
    author: "Admin",
    date: "10 Nov 2026",
  },
  {
    id: 2,
    title: "Standar Keselamatan Tambang Terbaru",
    category: "Artikel",
    status: "Draf",
    author: "Budi",
    date: "08 Nov 2026",
  },
  {
    id: 3,
    title: "Kemitraan Distribusi Energi Asia",
    category: "Berita",
    status: "Terjadwal",
    author: "Sari",
    date: "07 Nov 2026",
  },
  {
    id: 4,
    title: "Mengenal Jenis Batubara Kalori Tinggi",
    category: "Edukasi",
    status: "Publikasi",
    author: "Admin",
    date: "05 Nov 2026",
  },
  {
    id: 5,
    title: "Rencana Ekspansi Wilayah Timur",
    category: "Internal",
    status: "Draf",
    author: "Budi",
    date: "03 Nov 2026",
  },
  {
    id: 6,
    title: "Laporan Keberlanjutan 2026",
    category: "Laporan",
    status: "Terjadwal",
    author: "Sari",
    date: "01 Nov 2026",
  },
  {
    id: 7,
    title: "Teknologi Pengolahan Batubara Bersih",
    category: "Edukasi",
    status: "Publikasi",
    author: "Admin",
    date: "28 Okt 2026",
  },
  {
    id: 8,
    title: "Catatan Rapat Operasional Q4",
    category: "Internal",
    status: "Draf",
    author: "Budi",
    date: "26 Okt 2026",
  },
];

function StatusBadge({ status }: { status: PostStatus }) {
  const variant =
    status === "Publikasi"
      ? "default"
      : status === "Draf"
        ? "secondary"
        : "outline";

  return <Badge variant={variant}>{status}</Badge>;
}

export function PostsTable({ status }: { status?: PostStatus }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    return posts.filter(
      (post) =>
        (!status || post.status === status) &&
        (post.title.toLowerCase().includes(keyword) ||
          post.category.toLowerCase().includes(keyword))
    );
  }, [query, status]);

  return (
    <Card>
      <CardHeader className="gap-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <CardTitle>
              {status ? `Postingan ${status}` : "Semua Postingan"}
            </CardTitle>
            <CardDescription>
              {filtered.length} postingan ditampilkan
            </CardDescription>
          </div>
          <div className="relative w-full sm:w-64">
            <SearchIcon className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Cari postingan..."
              className="pl-8"
              aria-label="Cari postingan"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="pl-4 md:pl-6">Judul</TableHead>
              <TableHead className="hidden md:table-cell">Kategori</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden lg:table-cell">Penulis</TableHead>
              <TableHead className="hidden lg:table-cell">Tanggal</TableHead>
              <TableHead className="pr-4 text-right md:pr-6">
                <span className="sr-only">Aksi</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length ? (
              filtered.map((post) => (
                <TableRow key={post.id}>
                  <TableCell className="max-w-72 truncate pl-4 font-medium md:pl-6">
                    {post.title}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {post.category}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={post.status} />
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    {post.author}
                  </TableCell>
                  <TableCell className="hidden text-muted-foreground lg:table-cell">
                    {post.date}
                  </TableCell>
                  <TableCell className="pr-4 text-right md:pr-6">
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        render={
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            className="text-muted-foreground"
                          />
                        }
                      >
                        <EllipsisVerticalIcon />
                        <span className="sr-only">Buka menu</span>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-40">
                        <DropdownMenuItem>
                          <PencilIcon />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>Duplikat</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem variant="destructive">
                          <Trash2Icon />
                          Hapus
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-24 text-center text-muted-foreground"
                >
                  Tidak ada postingan yang cocok.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
