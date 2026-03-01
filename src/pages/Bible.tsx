import { useState } from "react";
import AppLayout from "@/components/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BookOpen, Search } from "lucide-react";
import UpgradeGate from "@/components/UpgradeGate";
import TrialBanner from "@/components/TrialBanner";

const bibleBooks = [
  { name: "Gênesis", chapters: 50 }, { name: "Êxodo", chapters: 40 }, { name: "Levítico", chapters: 27 },
  { name: "Números", chapters: 36 }, { name: "Deuteronômio", chapters: 34 }, { name: "Josué", chapters: 24 },
  { name: "Juízes", chapters: 21 }, { name: "Rute", chapters: 4 }, { name: "1 Samuel", chapters: 31 },
  { name: "2 Samuel", chapters: 24 }, { name: "1 Reis", chapters: 22 }, { name: "2 Reis", chapters: 25 },
  { name: "1 Crônicas", chapters: 29 }, { name: "2 Crônicas", chapters: 36 }, { name: "Esdras", chapters: 10 },
  { name: "Neemias", chapters: 13 }, { name: "Ester", chapters: 10 }, { name: "Jó", chapters: 42 },
  { name: "Salmos", chapters: 150 }, { name: "Provérbios", chapters: 31 }, { name: "Eclesiastes", chapters: 12 },
  { name: "Cantares", chapters: 8 }, { name: "Isaías", chapters: 66 }, { name: "Jeremias", chapters: 52 },
  { name: "Lamentações", chapters: 5 }, { name: "Ezequiel", chapters: 48 }, { name: "Daniel", chapters: 12 },
  { name: "Oséias", chapters: 14 }, { name: "Joel", chapters: 3 }, { name: "Amós", chapters: 9 },
  { name: "Obadias", chapters: 1 }, { name: "Jonas", chapters: 4 }, { name: "Miquéias", chapters: 7 },
  { name: "Naum", chapters: 3 }, { name: "Habacuque", chapters: 3 }, { name: "Sofonias", chapters: 3 },
  { name: "Ageu", chapters: 2 }, { name: "Zacarias", chapters: 14 }, { name: "Malaquias", chapters: 4 },
  { name: "Mateus", chapters: 28 }, { name: "Marcos", chapters: 16 }, { name: "Lucas", chapters: 24 },
  { name: "João", chapters: 21 }, { name: "Atos", chapters: 28 }, { name: "Romanos", chapters: 16 },
  { name: "1 Coríntios", chapters: 16 }, { name: "2 Coríntios", chapters: 13 }, { name: "Gálatas", chapters: 6 },
  { name: "Efésios", chapters: 6 }, { name: "Filipenses", chapters: 4 }, { name: "Colossenses", chapters: 4 },
  { name: "1 Tessalonicenses", chapters: 5 }, { name: "2 Tessalonicenses", chapters: 3 },
  { name: "1 Timóteo", chapters: 6 }, { name: "2 Timóteo", chapters: 4 }, { name: "Tito", chapters: 3 },
  { name: "Filemom", chapters: 1 }, { name: "Hebreus", chapters: 13 }, { name: "Tiago", chapters: 5 },
  { name: "1 Pedro", chapters: 5 }, { name: "2 Pedro", chapters: 3 }, { name: "1 João", chapters: 5 },
  { name: "2 João", chapters: 1 }, { name: "3 João", chapters: 1 }, { name: "Judas", chapters: 1 },
  { name: "Apocalipse", chapters: 22 },
];

const Bible = () => {
  const [search, setSearch] = useState("");
  const [selectedBook, setSelectedBook] = useState<string | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);
  const [verseContent, setVerseContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const filteredBooks = bibleBooks.filter((b) =>
    b.name.toLowerCase().includes(search.toLowerCase())
  );

  const loadChapter = async (book: string, chapter: number) => {
    setLoading(true);
    setSelectedChapter(chapter);
    try {
      const response = await fetch(
        `https://bible-api.com/${encodeURIComponent(book)}+${chapter}?translation=almeida`
      );
      const data = await response.json();
      if (data.text) {
        setVerseContent(data.text);
      } else {
        setVerseContent("Conteúdo não disponível para este capítulo. Tente outro livro ou capítulo.");
      }
    } catch {
      setVerseContent("Erro ao carregar o capítulo. Verifique sua conexão.");
    }
    setLoading(false);
  };

  const selectedBookData = bibleBooks.find((b) => b.name === selectedBook);

  return (
    <AppLayout>
      <UpgradeGate>
      <div className="space-y-6">
        <TrialBanner />
        <div className="flex items-center gap-3">
          <BookOpen className="w-6 h-6 text-gold" />
          <h1 className="font-serif text-2xl font-bold text-foreground">Bíblia Sagrada</h1>
        </div>

        {!selectedBook ? (
          <>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar livro..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {filteredBooks.map((book) => (
                <Card
                  key={book.name}
                  className="cursor-pointer hover:border-gold/30 transition-all bg-card border-border"
                  onClick={() => setSelectedBook(book.name)}
                >
                  <CardContent className="py-4 px-3 text-center">
                    <p className="font-medium text-foreground text-sm">{book.name}</p>
                    <p className="text-xs text-muted-foreground">{book.chapters} cap.</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        ) : !selectedChapter ? (
          <>
            <Button variant="ghost" onClick={() => { setSelectedBook(null); setVerseContent(null); }} className="text-gold">
              ← Voltar aos livros
            </Button>
            <h2 className="font-serif text-xl font-bold text-foreground">{selectedBook}</h2>
            <div className="grid grid-cols-5 sm:grid-cols-8 gap-2">
              {Array.from({ length: selectedBookData?.chapters || 0 }, (_, i) => (
                <Button
                  key={i + 1}
                  variant="outline"
                  className="aspect-square border-border hover:border-gold/50 hover:bg-gold/10"
                  onClick={() => loadChapter(selectedBook, i + 1)}
                >
                  {i + 1}
                </Button>
              ))}
            </div>
          </>
        ) : (
          <>
            <Button variant="ghost" onClick={() => { setSelectedChapter(null); setVerseContent(null); }} className="text-gold">
              ← Voltar aos capítulos
            </Button>
            <h2 className="font-serif text-xl font-bold text-foreground">
              {selectedBook} {selectedChapter}
            </h2>
            <Card className="bg-card border-border">
              <CardContent className="py-6">
                {loading ? (
                  <p className="text-muted-foreground animate-pulse">Carregando...</p>
                ) : (
                  <p className="text-foreground/90 leading-loose whitespace-pre-wrap text-base">
                    {verseContent}
                  </p>
                )}
              </CardContent>
            </Card>
          </>
        )}
      </div>
      </UpgradeGate>
    </AppLayout>
  );
};

export default Bible;
