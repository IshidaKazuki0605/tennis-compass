/**
 * ComparisonForm Component
 * 
 * Design Philosophy: 主観的な比較を簡単に記録
 * - Before/After セットアップを選択
 * - 5つの評価項目を -2 ~ 2 で評価
 * - 詳細なメモをオプションで追加
 */

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { RacketSetup, SetupComparison, EVALUATION_ITEMS, EVALUATION_ITEM_LABELS, EvaluationScore } from "@/lib/types";
import { createSetupComparison, getPlayer } from "@/lib/storage";
import { Loader2 } from "lucide-react";

interface ComparisonFormProps {
  setups: RacketSetup[];
  onSuccess?: () => void;
}

export default function ComparisonForm({ setups, onSuccess }: ComparisonFormProps) {
  const [loading, setLoading] = useState(false);
  const [beforeSetupId, setBeforeSetupId] = useState("");
  const [afterSetupId, setAfterSetupId] = useState("");
  const [note, setNote] = useState("");
  
  // Evaluation scores
  const [scores, setScores] = useState<Record<string, EvaluationScore>>({
    power: 0,
    spin: 0,
    control: 0,
    feel: 0,
    comfort: 0,
  });

  const handleScoreChange = (item: string, value: number[]) => {
    setScores((prev) => ({
      ...prev,
      [item]: value[0] as EvaluationScore,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!beforeSetupId || !afterSetupId) {
      alert("Before と After のセットアップを選択してください");
      return;
    }

    if (beforeSetupId === afterSetupId) {
      alert("異なるセットアップを選択してください");
      return;
    }

    setLoading(true);
    try {
      const player = getPlayer();
      if (!player) throw new Error("Player not found");

      const comparison: Omit<SetupComparison, "id" | "createdAt" | "updatedAt"> = {
        playerId: player.id,
        beforeSetupId,
        afterSetupId,
        power: scores.power || undefined,
        spin: scores.spin || undefined,
        control: scores.control || undefined,
        feel: scores.feel || undefined,
        comfort: scores.comfort || undefined,
        note: note.trim() || undefined,
      };

      createSetupComparison(comparison);

      // Reset form
      setBeforeSetupId("");
      setAfterSetupId("");
      setNote("");
      setScores({
        power: 0,
        spin: 0,
        control: 0,
        feel: 0,
        comfort: 0,
      });

      onSuccess?.();
    } catch (error) {
      console.error("Error creating comparison:", error);
      alert("比較の作成に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  const beforeSetup = setups.find((s) => s.id === beforeSetupId);
  const afterSetup = setups.find((s) => s.id === afterSetupId);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Setup Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Before */}
        <div className="space-y-2">
          <Label className="text-base font-semibold">Before セットアップ</Label>
          <Select value={beforeSetupId} onValueChange={setBeforeSetupId}>
            <SelectTrigger>
              <SelectValue placeholder="セットアップを選択..." />
            </SelectTrigger>
            <SelectContent>
              {setups.map((setup) => (
                <SelectItem key={setup.id} value={setup.id}>
                  {setup.racketName} / {setup.stringName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {beforeSetup && (
            <div className="text-xs text-muted-foreground mt-2 p-2 bg-muted/30 rounded">
              <p>{beforeSetup.racketName}</p>
              <p>{beforeSetup.stringName}</p>
              {beforeSetup.tension && <p>テンション: {beforeSetup.tension}</p>}
            </div>
          )}
        </div>

        {/* After */}
        <div className="space-y-2">
          <Label className="text-base font-semibold">After セットアップ</Label>
          <Select value={afterSetupId} onValueChange={setAfterSetupId}>
            <SelectTrigger>
              <SelectValue placeholder="セットアップを選択..." />
            </SelectTrigger>
            <SelectContent>
              {setups.map((setup) => (
                <SelectItem key={setup.id} value={setup.id}>
                  {setup.racketName} / {setup.stringName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {afterSetup && (
            <div className="text-xs text-muted-foreground mt-2 p-2 bg-muted/30 rounded">
              <p>{afterSetup.racketName}</p>
              <p>{afterSetup.stringName}</p>
              {afterSetup.tension && <p>テンション: {afterSetup.tension}</p>}
            </div>
          )}
        </div>
      </div>

      {/* Evaluation Items */}
      <Card className="bg-muted/30 border-dashed">
        <CardContent className="pt-4 pb-4">
          <p className="text-sm font-semibold text-foreground mb-6">評価項目</p>

          <div className="space-y-6">
            {EVALUATION_ITEMS.map((item) => (
              <div key={item} className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-semibold">
                    {EVALUATION_ITEM_LABELS[item]}
                  </Label>
                  <span className="text-xs font-mono bg-primary/10 px-2 py-1 rounded">
                    {scores[item] > 0 ? "+" : ""}{scores[item]}
                  </span>
                </div>
                <Slider
                  min={-2}
                  max={2}
                  step={1}
                  value={[scores[item]]}
                  onValueChange={(value) => handleScoreChange(item, value)}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>悪化</span>
                  <span>変化なし</span>
                  <span>向上</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Note */}
      <div className="space-y-2">
        <Label htmlFor="note" className="text-base font-semibold">
          詳細なメモ（オプション）
        </Label>
        <Textarea
          id="note"
          placeholder="このセットアップ変更についての詳しい感想や気づきを記入してください..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={4}
        />
      </div>

      {/* Submit Button */}
      <div className="flex gap-3 pt-4">
        <Button
          type="submit"
          disabled={loading || !beforeSetupId || !afterSetupId}
          className="flex-1"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              保存中...
            </>
          ) : (
            "比較を保存"
          )}
        </Button>
      </div>
    </form>
  );
}
