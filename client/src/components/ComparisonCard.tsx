/**
 * ComparisonCard Component
 * 
 * Design Philosophy: 比較結果を視覚的に表現
 * - Before/After セットアップを矢印で繋ぐ
 * - 5つの評価項目をバーチャートで表示
 * - 詳細なメモを表示
 */

import { SetupComparison, RacketSetup, EVALUATION_ITEMS, EVALUATION_ITEM_LABELS, EvaluationScore } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ja } from "date-fns/locale";

interface ComparisonCardProps {
  comparison: SetupComparison;
  setups: RacketSetup[];
}

const getScoreColor = (score: EvaluationScore | undefined) => {
  if (!score) return "bg-muted";
  if (score > 0) return "bg-green-500/20 text-green-700 dark:text-green-300";
  if (score < 0) return "bg-red-500/20 text-red-700 dark:text-red-300";
  return "bg-muted";
};

const getScoreLabel = (score: EvaluationScore | undefined) => {
  if (!score) return "-";
  return score > 0 ? `+${score}` : `${score}`;
};

export default function ComparisonCard({ comparison, setups }: ComparisonCardProps) {
  const beforeSetup = setups.find((s) => s.id === comparison.beforeSetupId);
  const afterSetup = setups.find((s) => s.id === comparison.afterSetupId);

  if (!beforeSetup || !afterSetup) {
    return null;
  }

  const timeAgo = formatDistanceToNow(new Date(comparison.createdAt), {
    addSuffix: true,
    locale: ja,
  });

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200 hover:border-primary/50">
      <CardHeader className="pb-3">
        <div className="space-y-2">
          <CardTitle className="text-base">セットアップ比較</CardTitle>
          <CardDescription className="text-xs">{timeAgo}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Before/After */}
        <div className="flex items-center gap-2 text-sm">
          <div className="flex-1">
            <p className="font-semibold text-foreground line-clamp-1">{beforeSetup.racketName}</p>
            <p className="text-xs text-muted-foreground line-clamp-1">{beforeSetup.stringName}</p>
          </div>
          <ArrowRight className="w-4 h-4 text-primary flex-shrink-0" />
          <div className="flex-1">
            <p className="font-semibold text-foreground line-clamp-1">{afterSetup.racketName}</p>
            <p className="text-xs text-muted-foreground line-clamp-1">{afterSetup.stringName}</p>
          </div>
        </div>

        {/* Evaluation Scores */}
        <div className="space-y-2 pt-2 border-t border-border">
          {EVALUATION_ITEMS.map((item) => {
            const score = comparison[item as keyof SetupComparison] as EvaluationScore | undefined;
            return (
              <div key={item} className="flex items-center justify-between text-xs">
                <span className="font-semibold text-muted-foreground w-16">
                  {EVALUATION_ITEM_LABELS[item]}
                </span>
                <div className="flex-1 mx-2 h-1 bg-muted rounded-full overflow-hidden">
                  {score !== undefined && score !== 0 && (
                    <div
                      className={`h-full ${score > 0 ? "bg-green-500" : "bg-red-500"}`}
                      style={{
                        width: `${Math.abs(score) * 25}%`,
                      }}
                    />
                  )}
                </div>
                <Badge
                  variant="outline"
                  className={`w-12 text-center justify-center ${getScoreColor(score)}`}
                >
                  {getScoreLabel(score)}
                </Badge>
              </div>
            );
          })}
        </div>

        {/* Note */}
        {comparison.note && (
          <div className="pt-2 border-t border-border">
            <p className="text-xs text-muted-foreground line-clamp-3">{comparison.note}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
