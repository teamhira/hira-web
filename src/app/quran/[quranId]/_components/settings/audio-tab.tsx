import { motion } from "motion/react";
import { Recitation } from "@/lib/quran";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

interface AudioTabProps {
  recitations: Recitation[];
  selectedReciter: number | undefined;
  setSelectedReciter: (id: number) => void;
}

export function AudioTab({ recitations, selectedReciter, setSelectedReciter }: AudioTabProps) {
  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
      <div className="space-y-4">
        <Label htmlFor="reciter-select" className="text-xs text-primary font-bold uppercase tracking-[0.2em]">Select Reciter</Label>
        <Select 
          value={selectedReciter?.toString()} 
          onValueChange={(value) => setSelectedReciter(Number(value))}
        >
          <SelectTrigger id="reciter-select" className="w-full bg-white/5 border-white/10 h-14 rounded-2xl px-5 focus:ring-primary/20">
            <SelectValue placeholder="Choose a reciter" />
          </SelectTrigger>
          <SelectContent className="bg-zinc-900 border-white/10">
            {recitations.map((r) => (
              <SelectItem key={r.id} value={r.id.toString()} className="text-white focus:bg-primary/20 focus:text-white">
                {r.reciter_name} {r.style ? `(${r.style})` : ''}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </motion.div>
  );
}
