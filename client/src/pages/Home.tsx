/**
 * Tennis Compass - Home Page
 * 
 * Design Philosophy: 
 * - 入力優先: セットアップ作成・比較の流れを直感的に
 * - 段階的な詳細化: 必須項目だけを見せ、詳細はオプショナル
 * - 視覚的な比較: タイムライン・カード形式でセットアップを表示
 */

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, ArrowRight, Trash2 } from "lucide-react";
import { RacketSetup, SetupComparison } from "@/lib/types";
import {
  initializePlayer,
  getRacketSetups,
  getSetupComparisons,
  deleteRacketSetup,
  deleteSetupComparison,
} from "@/lib/storage";
import SetupForm from "@/components/SetupForm";
import ComparisonForm from "@/components/ComparisonForm";
import SetupCard from "@/components/SetupCard";
import ComparisonCard from "@/components/ComparisonCard";

export default function Home() {
  const [activeTab, setActiveTab] = useState("setups");
  const [setups, setSetups] = useState<RacketSetup[]>([]);
  const [comparisons, setComparisons] = useState<SetupComparison[]>([]);
  const [showSetupForm, setShowSetupForm] = useState(false);
  const [showComparisonForm, setShowComparisonForm] = useState(false);

  // Initialize player and load data
  useEffect(() => {
    initializePlayer();
    loadData();
  }, []);

  const loadData = () => {
    setSetups(getRacketSetups());
    setComparisons(getSetupComparisons());
  };

  const handleSetupCreated = () => {
    loadData();
    setShowSetupForm(false);
  };

  const handleComparisonCreated = () => {
    loadData();
    setShowComparisonForm(false);
  };

  const handleDeleteSetup = (id: string) => {
    if (confirm("このセットアップを削除しますか？")) {
      deleteRacketSetup(id);
      loadData();
    }
  };

  const handleDeleteComparison = (id: string) => {
    if (confirm("この比較を削除しますか？")) {
      deleteSetupComparison(id);
      loadData();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-primary">Tennis Compass</h1>
              <p className="text-sm text-muted-foreground">テニコン - セットアップの主観比較ツール</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="setups">セットアップ ({setups.length})</TabsTrigger>
            <TabsTrigger value="comparisons">比較 ({comparisons.length})</TabsTrigger>
          </TabsList>

          {/* Setups Tab */}
          <TabsContent value="setups" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-foreground">ラケットセットアップ</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  使用したラケット・ストリング・テンションを記録します
                </p>
              </div>
              <Button
                onClick={() => setShowSetupForm(!showSetupForm)}
                className="gap-2"
              >
                <Plus className="w-4 h-4" />
                新しいセットアップ
              </Button>
            </div>

            {showSetupForm && (
              <Card className="border-accent/30 bg-accent/5">
                <CardHeader>
                  <CardTitle>セットアップを作成</CardTitle>
                  <CardDescription>
                    ラケット・ストリング・テンションなどの情報を入力してください
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <SetupForm onSuccess={handleSetupCreated} />
                </CardContent>
              </Card>
            )}

            {setups.length === 0 ? (
              <Card className="border-dashed">
                <CardContent className="pt-12 pb-12 text-center">
                  <p className="text-muted-foreground mb-4">
                    まだセットアップが登録されていません
                  </p>
                  <Button
                    onClick={() => setShowSetupForm(true)}
                    variant="outline"
                    className="gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    最初のセットアップを作成
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {setups.map((setup) => (
                  <div key={setup.id} className="group relative">
                    <SetupCard setup={setup} />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteSetup(setup.id)}
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Comparisons Tab */}
          <TabsContent value="comparisons" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-foreground">セットアップ比較</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  2つのセットアップ間の主観的な比較結果を記録します
                </p>
              </div>
              <Button
                onClick={() => setShowComparisonForm(!showComparisonForm)}
                className="gap-2"
                disabled={setups.length < 2}
              >
                <Plus className="w-4 h-4" />
                新しい比較
              </Button>
            </div>

            {setups.length < 2 && (
              <Card className="border-yellow-200 bg-yellow-50 dark:bg-yellow-950/20">
                <CardContent className="pt-4 pb-4">
                  <p className="text-sm text-yellow-800 dark:text-yellow-200">
                    比較を作成するには、最低2つ以上のセットアップが必要です
                  </p>
                </CardContent>
              </Card>
            )}

            {showComparisonForm && setups.length >= 2 && (
              <Card className="border-accent/30 bg-accent/5">
                <CardHeader>
                  <CardTitle>セットアップを比較</CardTitle>
                  <CardDescription>
                    2つのセットアップを選択して、主観的な変化を記録してください
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ComparisonForm setups={setups} onSuccess={handleComparisonCreated} />
                </CardContent>
              </Card>
            )}

            {comparisons.length === 0 ? (
              <Card className="border-dashed">
                <CardContent className="pt-12 pb-12 text-center">
                  <p className="text-muted-foreground mb-4">
                    まだ比較が記録されていません
                  </p>
                  {setups.length >= 2 && (
                    <Button
                      onClick={() => setShowComparisonForm(true)}
                      variant="outline"
                      className="gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      最初の比較を作成
                    </Button>
                  )}
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {comparisons.map((comparison) => (
                  <div key={comparison.id} className="group relative">
                    <ComparisonCard comparison={comparison} setups={setups} />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteComparison(comparison.id)}
                      className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-background/50 mt-12">
        <div className="container py-8 text-center text-sm text-muted-foreground">
          <p>Tennis Compass v0.1 - Your Personal Tennis Setup Companion</p>
          <p className="mt-2">
            💡 Tip: セットアップを記録して、自分のテニスの最適化を追求しましょう
          </p>
        </div>
      </footer>
    </div>
  );
}
