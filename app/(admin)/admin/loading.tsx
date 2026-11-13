import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const SUMMARY_CARD_PRESETS = [
  {
    labelWidth: "w-28",
    valueWidth: "w-16",
    badgeWidth: "w-24",
    noteWidth: "w-44",
  },
  {
    labelWidth: "w-16",
    valueWidth: "w-12",
    badgeWidth: "w-28",
    noteWidth: "w-40",
  },
  {
    labelWidth: "w-24",
    valueWidth: "w-14",
    badgeWidth: "w-24",
    noteWidth: "w-48",
  },
] as const;

const TABLE_ROW_PRESETS = [
  {
    titleWidth: "w-4/5",
    categoryWidth: "w-16",
    statusWidth: "w-20",
    authorWidth: "w-20",
    dateWidth: "w-24",
  },
  {
    titleWidth: "w-3/5",
    categoryWidth: "w-14",
    statusWidth: "w-16",
    authorWidth: "w-16",
    dateWidth: "w-24",
  },
  {
    titleWidth: "w-11/12",
    categoryWidth: "w-20",
    statusWidth: "w-22",
    authorWidth: "w-24",
    dateWidth: "w-20",
  },
  {
    titleWidth: "w-2/3",
    categoryWidth: "w-16",
    statusWidth: "w-20",
    authorWidth: "w-20",
    dateWidth: "w-24",
  },
  {
    titleWidth: "w-3/4",
    categoryWidth: "w-14",
    statusWidth: "w-16",
    authorWidth: "w-16",
    dateWidth: "w-20",
  },
] as const;

const TABLE_GRID_CLASS =
  "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_5.5rem_auto] md:px-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_5.5rem_minmax(0,1fr)_6.5rem_auto]";

function AdminSkeleton({ className }: { className?: string }) {
  return (
    <Skeleton
      aria-hidden="true"
      className={cn(
        "bg-border/80 dark:bg-muted motion-reduce:animate-none",
        className,
      )}
    />
  );
}

export default function AdminLoading() {
  return (
    <div
      role="status"
      aria-busy="true"
      aria-live="polite"
      aria-label="Memuat konten halaman admin"
      className="flex flex-col gap-4 md:gap-6"
    >
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="flex min-w-0 flex-col gap-2">
          <AdminSkeleton className="h-7 w-48 max-w-full" />
          <p className="text-sm text-muted-foreground">
            Memuat halaman admin...
          </p>
        </div>
        <AdminSkeleton className="h-8 w-36 shrink-0" />
      </div>

      <div className="grid grid-cols-1 gap-4 @xl/main:grid-cols-2 @5xl/main:grid-cols-3">
        {SUMMARY_CARD_PRESETS.map((preset, index) => (
          <Card
            key={index}
            className="gap-3 py-4 @xl/main:last:col-span-2 @5xl/main:last:col-span-1"
          >
            <CardHeader className="gap-2">
              <div className="flex items-center justify-between gap-2">
                <AdminSkeleton className={cn("h-4", preset.labelWidth)} />
                <AdminSkeleton
                  className={cn("h-5 rounded-full", preset.badgeWidth)}
                />
              </div>
              <AdminSkeleton className={cn("h-8", preset.valueWidth)} />
            </CardHeader>
            <CardContent className="pt-0">
              <AdminSkeleton
                className={cn("h-4 max-w-full", preset.noteWidth)}
              />
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader className="gap-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 flex-col gap-1.5">
              <AdminSkeleton className="h-5 w-40 max-w-full" />
              <AdminSkeleton className="h-4 w-56 max-w-full" />
            </div>
            <AdminSkeleton className="h-8 w-full sm:w-64" />
          </div>
        </CardHeader>
        <CardContent className="px-0">
          <div className={cn(TABLE_GRID_CLASS, "border-b pb-3")}>
            <AdminSkeleton className="h-4 w-16" />
            <AdminSkeleton className="hidden h-4 w-16 md:block" />
            <AdminSkeleton className="h-4 w-14" />
            <AdminSkeleton className="hidden h-4 w-16 lg:block" />
            <AdminSkeleton className="hidden h-4 w-16 lg:block" />
            <span className="hidden size-7 md:block" aria-hidden="true" />
          </div>
          <div className="divide-y">
            {TABLE_ROW_PRESETS.map((row, index) => (
              <div key={index} className={cn(TABLE_GRID_CLASS, "py-3.5")}>
                <div className="min-w-0">
                  <AdminSkeleton
                    className={cn("h-4 max-w-full", row.titleWidth)}
                  />
                </div>
                <AdminSkeleton
                  className={cn("hidden h-4 md:block", row.categoryWidth)}
                />
                <AdminSkeleton
                  className={cn("h-5 rounded-full", row.statusWidth)}
                />
                <AdminSkeleton
                  className={cn("hidden h-4 lg:block", row.authorWidth)}
                />
                <AdminSkeleton
                  className={cn("hidden h-4 lg:block", row.dateWidth)}
                />
                <AdminSkeleton className="hidden size-7 md:block" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

