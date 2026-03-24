import { Input } from "@/components/ui/input";

export default function InputField({ label, ...props }: any) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>
      <Input {...props} />
    </div>
  );
}