export function DistrictPrintFooter({ districtName }: { districtName: string }) {
  return (
    <div className="district-print-footer hidden">
      <span>{districtName} - District Factsheet</span>
      <span className="district-print-page" />
    </div>
  );
}
