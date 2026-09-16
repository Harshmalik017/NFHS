export type SampleSizeDistrict = {
  name: string;
  households: number;
  women: number;
  men: number;
};

export function buildSampleSizeCsv(districts: SampleSizeDistrict[]): string {
  const header = ["District", "Households", "Women", "Men"];
  const rows = districts.map((district) => [
    district.name,
    String(district.households),
    String(district.women),
    String(district.men),
  ]);

  return [header, ...rows]
    .map((row) =>
      row
        .map((cell) => `"${cell.replace(/"/g, '""')}"`)
        .join(","),
    )
    .join("\n");
}
