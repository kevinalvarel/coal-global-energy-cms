import type { PostCategory } from "@/validations/content-validations";

/**
 * Representasi item berita sementara sebelum terhubung ke CMS database.
 * TODO: Gantikan sumber data ini dengan query dari `servers/content-services.ts`.
 */
export interface NewsItem {
  slug: string;
  title: string;
  excerpt: string;
  category: PostCategory;
  publishedAt: string;
  imageUrl: string;
  imageAlt: string;
  content: string[];
}

/**
 * Data dummy publikasi PT. Coal Global Energy.
 * Menggunakan aset lokal sementara di `public/images/landing/` sesuai cakupan fase dummy data.
 */
export const DUMMY_NEWS: NewsItem[] = [
  {
    slug: "penguatan-kapasitas-stockpile-bojonegara-untuk-distribusi-jawa-barat",
    title:
      "Penguatan Fasilitas Stockpile Bojonegara untuk Menjaga Kelancaran Pasokan Energi Industri",
    excerpt:
      "Penataan area penumpukan dan jalur muat di Bojonegara difokuskan untuk mempercepat kesiapan pengiriman batubara dan biomassa menuju kawasan industri Banten dan Jawa Barat.",
    category: "Berita",
    publishedAt: "2026-03-18",
    imageUrl: "/images/landing/gallery/operasional-1.jpeg",
    imageAlt:
      "Area operasional dan penumpukan material energi di stockpile Bojonegara",
    content: [
      "PT. Coal Global Energy terus menyempurnakan tata kelola operasional di area stockpile Bojonegara guna memastikan proses penerimaan, pemilahan, dan pemuatan komoditas berjalan tertib dan terjadwal.",
      "Penataan zonasi penumpukan dilakukan dengan memisahkan blok penyimpanan berdasarkan jenis komoditas serta spesifikasi kalori. Langkah ini memudahkan tim lapangan dalam menjaga kestabilan kualitas material sebelum diberangkatkan menuju lokasi mitra industri.",
      "Selain penataan area penyimpanan, koordinasi jadwal armada pengangkutan juga diperketat agar proses bongkar muat tetap selaras dengan kebutuhan produksi pelanggan di wilayah Banten, Jawa Barat, dan sekitarnya.",
    ],
  },
  {
    slug: "prosedur-pemeriksaan-mutu-dan-kalibrasi-pasokan-komoditas",
    title:
      "Prosedur Pemeriksaan Mutu Material Sebelum Pengiriman ke Fasilitas Mitra",
    excerpt:
      "Setiap lot pengiriman melalui tahapan verifikasi visual, pengambilan sampel representatif, dan pencatatan dokumen mutu guna menjaga kesesuaian spesifikasi teknis pelanggan.",
    category: "Laporan",
    publishedAt: "2026-03-10",
    imageUrl: "/images/landing/gallery/coal.jpeg",
    imageAlt:
      "Material batubara di area stockpile yang siap melalui tahap pemeriksaan mutu",
    content: [
      "Konsistensi kualitas merupakan aspek utama dalam rantai pasok bahan bakar industri. Sebelum unit pengangkutan meninggalkan area stockpile, tim kendali mutu melakukan pemeriksaan fisik dan pengambilan sampel sesuai standar kerja internal.",
      "Data hasil pemeriksaan didokumentasikan secara terstruktur bersama catatan asal barang dan jadwal keberangkatan. Dengan dokumentasi yang rapi, mitra industri memperoleh transparansi penuh atas setiap pengiriman yang diterima.",
      "Pendekatan ini juga membantu perusahaan mengevaluasi performa tiap sumber pasokan serta memastikan material yang diterima pengguna akhir sesuai dengan karakter unit pembakaran masing-masing pabrik.",
    ],
  },
  {
    slug: "pemanfaatan-biomassa-pks-dan-wood-chip-untuk-kebutuhan-termal-industri",
    title:
      "Peran Cangkang Kelapa Sawit dan Wood Chip dalam Mendukung Transisi Energi Industri",
    excerpt:
      "Selain batubara, pemanfaatan biomassa padat seperti palm kernel shell dan wood chip semakin diminati pelaku industri yang membutuhkan opsi bahan bakar co-firing dan boiler biomassa.",
    category: "Artikel",
    publishedAt: "2026-02-27",
    imageUrl: "/images/landing/gallery/operasional-2.jpeg",
    imageAlt:
      "Aktivitas alat berat dalam pengelolaan material energi dan biomassa di lapangan",
    content: [
      "Kebutuhan energi termal di sektor manufaktur terus berkembang seiring dorongan efisiensi biaya operasional dan penerapan bauran energi yang lebih beragam. Biomassa padat seperti cangkang kelapa sawit (PKS) dan wood chip menjadi salah satu alternatif yang relevan.",
      "Dalam praktiknya, keandalan pasokan biomassa sangat bergantung pada kadar air, ukuran partikel, dan kebersihan material dari pengotor. Penanganan penyimpanan yang terlindung dan perputaran stok yang teratur berperan besar menjaga karakteristik pembakaran.",
      "PT. Coal Global Energy menyediakan pasokan batubara serta komoditas biomassa dalam satu koordinasi distribusi sehingga pelanggan dapat menyesuaikan bauran bahan bakar secara praktis sesuai kesiapan fasilitas boiler mereka.",
    ],
  },
  {
    slug: "kelengkapan-dokumen-skab-dan-legalitas-tata-niaga-batubara",
    title:
      "Memahami Pentingnya Kelengkapan Dokumen SKAB dalam Pengadaan Batubara Resmi",
    excerpt:
      "Surat Keterangan Asal Barang dan ketertelusuran dokumen pengangkutan menjadi fondasi utama kepatuhan hukum serta keamanan rantai pasok bagi perusahaan pengguna akhir.",
    category: "Edukasi",
    publishedAt: "2026-02-14",
    imageUrl: "/images/landing/gallery/office.jpeg",
    imageAlt:
      "Ruang koordinasi operasional dan administrasi pengadaan komoditas energi",
    content: [
      "Dalam tata niaga pertambangan dan perdagangan batubara di Indonesia, ketertelusuran asal komoditas bukan sekadar kewajiban administratif, melainkan jaminan legalitas bagi pemasok maupun pembeli industri.",
      "Dokumen seperti Surat Keterangan Asal Barang (SKAB), surat jalan pengangkutan, dan kelengkapan izin usaha pertambangan atau pengangkutan menjadi verifikasi penting sebelum proses serah terima di lokasi pabrik.",
      "Melalui verifikasi dokumen sebelum keberangkatan armada, risiko hambatan distribusi di lapangan dapat ditekan sekaligus memastikan proses audit pengadaan internal mitra berjalan lancar.",
    ],
  },
  {
    slug: "kesiapan-pasokan-batu-split-untuk-dukungan-proyek-infrastruktur",
    title:
      "Koordinasi Penyaluran Material Batu Split untuk Kebutuhan Konstruksi dan Infrastruktur",
    excerpt:
      "Kelancaran proyek konstruksi dan pengadaan beton siap pakai menuntut ketersediaan agregat batu split dengan gradasi ukuran yang konsisten serta pengiriman tepat waktu.",
    category: "Berita",
    publishedAt: "2026-01-30",
    imageUrl: "/images/landing/gallery/operasional-4.png",
    imageAlt:
      "Armada dan kegiatan operasional distribusi material konstruksi serta energi",
    content: [
      "Selain melayani penyediaan bahan bakar energi industri, PT. Coal Global Energy mendukung pengadaan material konstruksi berupa batu split dalam berbagai fraksi ukuran sesuai kebutuhan proyek.",
      "Ketepatan jadwal pengiriman menjadi fokus utama agar area batching plant dan proyek lapangan tidak mengalami kekosongan stok agregat saat pekerjaan pengecoran berlangsung.",
      "Setiap permintaan pengiriman dijadwalkan melalui koordinasi antara tim logistik dan penanggung jawab proyek sehingga kapasitas muat dan akses lokasi tujuan dapat dipetakan sejak awal.",
    ],
  },
  {
    slug: "manajemen-stockpile-terintegrasi-untuk-menjaga-kontinuitas-pabrik",
    title:
      "Strategi Manajemen Stockpile untuk Mengantisipasi Gangguan Cuaca dan Lonjakan Kebutuhan",
    excerpt:
      "Perencanaan cadangan stok penyangga serta rotasi muatan yang teratur membantu industri menghindari keterlambatan pasokan saat kondisi cuaca kurang bersahabat.",
    category: "Artikel",
    publishedAt: "2026-01-19",
    imageUrl: "/images/landing/gallery/operasional-5.jpeg",
    imageAlt:
      "Pengaturan stok dan pemuatan material di area stockpile terbuka",
    content: [
      "Fluktuasi cuaca dan kepadatan jalur distribusi darat maupun laut sering menjadi tantangan dalam pengiriman komoditas curah. Keberadaan stockpile dekat kawasan pengguna akhir memberi ruang penyangga yang sangat membantu.",
      "Dengan menerapkan rotasi stok yang teratur, material yang lebih dulu masuk dapat segera disalurkan sehingga kualitas fisik tetap terjaga tanpa penumpukan berlebih.",
      "Komunikasi berkala mengenai jadwal pemakaian mingguan dari pihak pabrik memungkinkan tim pemasok menyusun rencana pengisian ulang secara lebih akurat.",
    ],
  },
  {
    slug: "panduan-awal-menentukan-spesifikasi-kalori-batubara-untuk-boiler",
    title:
      "Panduan Dasar Menyesuaikan Nilai Kalori dan Kadar Abu Batubara dengan Karakter Boiler",
    excerpt:
      "Pemilihan spesifikasi batubara yang selaras dengan rancangan ruang bakar berperan menjaga efisiensi perpindahan panas dan meminimalkan perawatan abu sisa pembakaran.",
    category: "Edukasi",
    publishedAt: "2026-01-08",
    imageUrl: "/images/landing/about.jpeg",
    imageAlt:
      "Aktivitas pengawasan operasional stockpile dan komoditas batubara industri",
    content: [
      "Setiap unit boiler industri dirancang untuk bekerja optimal pada rentang nilai kalori, kadar air total, kadar abu, dan kandungan sulfur tertentu. Menggunakan spesifikasi yang terlalu jauh dari rancangan awal dapat memengaruhi kestabilan suhu uap.",
      "Nilai kalori yang sesuai membantu proses pembakaran berlangsung lebih merata, sedangkan pengendalian kadar abu dan kadar air menekan beban penanganan residu serta potensi korosi pada saluran buang.",
      "Tim teknis pengadaan disarankan meninjau spesifikasi pabrikan boiler sebelum menyepakati rencana pasokan berkala agar kualitas bahan bakar selaras dengan kebutuhan operasi harian.",
    ],
  },
];

const NEWS_DATE_FORMATTER = new Intl.DateTimeFormat("id-ID", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

/**
 * Mengambil daftar berita terbaru untuk carousel hero.
 */
export function getLatestNews(limit = 4): NewsItem[] {
  return DUMMY_NEWS.slice(0, limit);
}

/**
 * Mencari satu berita berdasarkan slug URL.
 */
export function getNewsBySlug(slug: string): NewsItem | undefined {
  return DUMMY_NEWS.find((item) => item.slug === slug);
}

/**
 * Mengambil berita terkait selain artikel yang sedang dibuka.
 */
export function getRelatedNews(currentSlug: string, limit = 2): NewsItem[] {
  return DUMMY_NEWS.filter((item) => item.slug !== currentSlug).slice(0, limit);
}

/**
 * Memformat tanggal ISO `YYYY-MM-DD` ke format tanggal Indonesia.
 */
export function formatNewsDate(isoDate: string): string {
  const parsed = new Date(`${isoDate}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) {
    return isoDate;
  }
  return NEWS_DATE_FORMATTER.format(parsed);
}

