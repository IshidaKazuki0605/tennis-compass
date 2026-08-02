/**
 * SetupForm Component
 * 
 * Design Philosophy: 入力ハードルを最小化
 * - 必須項目: ラケット名、ストリング名
 * - オプション: テンション、カスタム、メモ
 * - ドロップダウンで一般的な製品を提案、自由入力も可能
 */

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Combobox } from "@/components/ui/combobox";
import { getRacketSpecs, getStringSpecs, createRacketSetup, getPlayer } from "@/lib/storage";
import { RacketSetup } from "@/lib/types";
import { Loader2 } from "lucide-react";

interface SetupFormProps {
  onSuccess?: () => void;
}

export default function SetupForm({ onSuccess }: SetupFormProps) {
  const [loading, setLoading] = useState(false);
  const [racketName, setRacketName] = useState("");
  const [stringName, setStringName] = useState("");
  const [tension, setTension] = useState("");
  const [custom, setCustom] = useState("");
  const [note, setNote] = useState("");

  const racketSpecs = getRacketSpecs();
  const stringSpecs = getStringSpecs();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!racketName.trim() || !stringName.trim()) {
      alert("ラケット名とストリング名は必須です");
      return;
    }

    setLoading(true);
    try {
      const player = getPlayer();
      if (!player) throw new Error("Player not found");

      const setup: Omit<RacketSetup, "id" | "createdAt" | "updatedAt"> = {
        playerId: player.id,
        racketName: racketName.trim(),
        stringName: stringName.trim(),
        tension: tension.trim() || undefined,
        custom: custom.trim() || undefined,
        note: note.trim() || undefined,
      };

      createRacketSetup(setup);
      
      // Reset form
      setRacketName("");
      setStringName("");
      setTension("");
      setCustom("");
      setNote("");

      onSuccess?.();
    } catch (error) {
      console.error("Error creating setup:", error);
      alert("セットアップの作成に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Racket Name */}
      <div className="space-y-2">
        <Label htmlFor="racket" className="text-base font-semibold">
          ラケット <span className="text-destructive">*</span>
        </Label>
        <Combobox
          placeholder="HEAD Gravity MP 2023 など..."
          options={racketSpecs.map((spec) => ({
            value: spec.name,
            label: spec.name,
          }))}
          value={racketName}
          onValueChange={setRacketName}
          allowCustom
        />
        <p className="text-xs text-muted-foreground">
          一般的なラケットから選択するか、自由に入力できます
        </p>
      </div>

      {/* String Name */}
      <div className="space-y-2">
        <Label htmlFor="string" className="text-base font-semibold">
          ストリング <span className="text-destructive">*</span>
        </Label>
        <Combobox
          placeholder="HAWK TOUCH など..."
          options={stringSpecs.map((spec) => ({
            value: spec.name,
            label: spec.name,
          }))}
          value={stringName}
          onValueChange={setStringName}
          allowCustom
        />
        <p className="text-xs text-muted-foreground">
          一般的なストリングから選択するか、自由に入力できます
        </p>
      </div>

      {/* Optional Fields */}
      <Card className="bg-muted/30 border-dashed">
        <CardContent className="pt-4 pb-4">
          <p className="text-sm font-semibold text-foreground mb-4">オプション情報</p>

          {/* Tension */}
          <div className="space-y-2 mb-4">
            <Label htmlFor="tension" className="text-sm">
              テンション
            </Label>
            <Input
              id="tension"
              placeholder="47/47 など..."
              value={tension}
              onChange={(e) => setTension(e.target.value)}
            />
          </div>

          {/* Custom */}
          <div className="space-y-2 mb-4">
            <Label htmlFor="custom" className="text-sm">
              カスタム情報
            </Label>
            <Input
              id="custom"
              placeholder="鉛3g、グリップ交換 など..."
              value={custom}
              onChange={(e) => setCustom(e.target.value)}
            />
          </div>

          {/* Note */}
          <div className="space-y-2">
            <Label htmlFor="note" className="text-sm">
              メモ
            </Label>
            <Textarea
              id="note"
              placeholder="このセットアップについての感想や特記事項..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Submit Button */}
      <div className="flex gap-3 pt-4">
        <Button
          type="submit"
          disabled={loading}
          className="flex-1"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              作成中...
            </>
          ) : (
            "セットアップを保存"
          )}
        </Button>
      </div>
    </form>
  );
}
