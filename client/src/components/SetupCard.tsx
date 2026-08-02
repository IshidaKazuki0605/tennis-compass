/**
 * SetupCard Component
 * 
 * Design Philosophy: セットアップ情報を視覚的に表現
 * - コンパクトで読みやすい
 * - ホバーで詳細情報を表示
 * - 作成日時を表示
 */

import { RacketSetup } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { ja } from "date-fns/locale";

interface SetupCardProps {
  setup: RacketSetup;
}

export default function SetupCard({ setup }: SetupCardProps) {
  const timeAgo = formatDistanceToNow(new Date(setup.createdAt), {
    addSuffix: true,
    locale: ja,
  });

  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-200 hover:border-primary/50">
      <CardHeader className="pb-3">
        <div className="space-y-2">
          <CardTitle className="text-lg line-clamp-2">{setup.racketName}</CardTitle>
          <CardDescription className="text-sm">{setup.stringName}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Tension */}
        {setup.tension && (
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-muted-foreground">テンション:</span>
            <Badge variant="secondary" className="text-xs">
              {setup.tension}
            </Badge>
          </div>
        )}

        {/* Custom */}
        {setup.custom && (
          <div className="flex items-start gap-2">
            <span className="text-xs font-semibold text-muted-foreground">カスタム:</span>
            <span className="text-xs text-foreground">{setup.custom}</span>
          </div>
        )}

        {/* Note */}
        {setup.note && (
          <div className="pt-2 border-t border-border">
            <p className="text-xs text-muted-foreground line-clamp-2">{setup.note}</p>
          </div>
        )}

        {/* Timestamp */}
        <div className="pt-2 border-t border-border">
          <p className="text-xs text-muted-foreground">{timeAgo}</p>
        </div>
      </CardContent>
    </Card>
  );
}
