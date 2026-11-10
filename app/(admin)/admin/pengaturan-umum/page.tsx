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

export default function PengaturanUmumPage() {
  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <PageHeader
        title="Pengaturan Umum"
        description="Informasi dasar dan identitas website."
      />

      <Card>
        <CardHeader>
          <CardTitle>Identitas Website</CardTitle>
          <CardDescription>
            Perubahan di sini akan diterapkan ke seluruh halaman.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-5">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="nama-situs">Nama Website</Label>
                <Input id="nama-situs" defaultValue="Coal Global Energy" />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="email">Email Kontak</Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue="info@coalglobalenergy.com"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="telepon">Telepon</Label>
                <Input id="telepon" defaultValue="+62 21 1234 5678" />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="alamat">Alamat</Label>
                <Input id="alamat" defaultValue="Jakarta, Indonesia" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="deskripsi">Deskripsi Singkat</Label>
              <textarea
                id="deskripsi"
                rows={4}
                defaultValue="Perusahaan energi batubara terintegrasi dengan operasi global."
                className="w-full rounded-lg border border-input bg-transparent px-2.5 py-2 text-base outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:text-sm dark:bg-input/30"
              />
            </div>
          </form>
        </CardContent>
        <CardFooter className="justify-end">
          <Button type="button">Simpan Pengaturan</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
