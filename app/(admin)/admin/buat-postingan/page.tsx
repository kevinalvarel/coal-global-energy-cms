import Link from "next/link";

import { PageHeader } from "@/components/admin/page-header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function BuatPostinganPage() {
  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <PageHeader
        title="Buat Postingan"
        description="Tulis artikel atau berita baru untuk website."
      />

      <Card>
        <CardHeader>
          <CardTitle>Detail Postingan</CardTitle>
          <CardDescription>
            Isi informasi dasar postingan. Data ini masih dummy.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <Label htmlFor="judul">Judul</Label>
              <Input id="judul" placeholder="Masukkan judul postingan" />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="slug">Slug</Label>
                <Input id="slug" placeholder="judul-postingan" />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="kategori">Kategori</Label>
                <Select
                  defaultValue="Berita"
                  items={[
                    { label: "Berita", value: "Berita" },
                    { label: "Artikel", value: "Artikel" },
                    { label: "Edukasi", value: "Edukasi" },
                    { label: "Laporan", value: "Laporan" },
                  ]}
                >
                  <SelectTrigger id="kategori" className="w-full">
                    <SelectValue placeholder="Pilih kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="Berita">Berita</SelectItem>
                      <SelectItem value="Artikel">Artikel</SelectItem>
                      <SelectItem value="Edukasi">Edukasi</SelectItem>
                      <SelectItem value="Laporan">Laporan</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="status">Status</Label>
              <Select
                defaultValue="Draf"
                items={[
                  { label: "Draf", value: "Draf" },
                  { label: "Terjadwal", value: "Terjadwal" },
                  { label: "Publikasi", value: "Publikasi" },
                ]}
              >
                <SelectTrigger id="status" className="w-full md:w-56">
                  <SelectValue placeholder="Pilih status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Draf">Draf</SelectItem>
                    <SelectItem value="Terjadwal">Terjadwal</SelectItem>
                    <SelectItem value="Publikasi">Publikasi</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="ringkasan">Ringkasan</Label>
              <textarea
                id="ringkasan"
                rows={3}
                placeholder="Ringkasan singkat postingan"
                className="w-full rounded-lg border border-input bg-transparent px-2.5 py-2 text-base outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:text-sm dark:bg-input/30"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="konten">Konten</Label>
              <textarea
                id="konten"
                rows={8}
                placeholder="Tulis konten postingan di sini..."
                className="w-full rounded-lg border border-input bg-transparent px-2.5 py-2 text-base outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:text-sm dark:bg-input/30"
              />
            </div>
          </form>
        </CardContent>
        <CardFooter className="justify-end gap-2">
          <Button
            nativeButton={false}
            variant="outline"
            render={<Link href="/admin/semua-postingan" />}
          >
            Batal
          </Button>
          <Button type="button">Simpan Draf</Button>
          <Button type="button">Publikasikan</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
