/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Activity, 
  Apple, 
  Clock, 
  Dumbbell, 
  Flame, 
  Heart, 
  Info, 
  Moon, 
  Navigation, 
  Timer, 
  TrendingUp, 
  Zap,
  ChevronRight,
  ChevronLeft,
  Droplets,
  Utensils,
  Coffee,
  Calculator,
  Target,
  Linkedin,
  ExternalLink,
  Sun,
  Palette,
  Mail,
  ShieldAlert,
  ShoppingBag,
  Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const sections = [
  { id: "basics", title: "איך לרוץ נכון", icon: Activity },
  { id: "training", title: "תוכנית אימונים", icon: TrendingUp },
  { id: "gear", title: "ציוד וטכנולוגיה", icon: ShoppingBag },
  { id: "nutrition", title: "תזונה והידרציה", icon: Apple },
  { id: "warmup", title: "חימום והכנה", icon: Flame },
  { id: "recovery", title: "התאוששות", icon: Moon },
  { id: "injuries", title: "מניעת פציעות", icon: ShieldAlert },
  { id: "faq", title: "שאלות ותשובות", icon: Info },
];

function RacePredictor({ theme, cardClasses }: { theme: string, cardClasses: any }) {
  const [currentDist, setCurrentDist] = useState("5");
  const [currentHours, setCurrentHours] = useState("0");
  const [currentMins, setCurrentMins] = useState("25");
  const [currentSecs, setCurrentSecs] = useState("00");
  const [targetDist, setTargetDist] = useState("10");

  const prediction = useMemo(() => {
    const t1 = parseInt(currentHours) * 3600 + parseInt(currentMins) * 60 + parseInt(currentSecs);
    const d1 = parseFloat(currentDist);
    const d2 = parseFloat(targetDist);

    if (isNaN(t1) || isNaN(d1) || isNaN(d2) || d1 === 0) return null;

    // Riegel's Formula: T2 = T1 * (D2/D1)^1.06
    const t2 = t1 * Math.pow(d2 / d1, 1.06);
    
    const h = Math.floor(t2 / 3600);
    const m = Math.floor((t2 % 3600) / 60);
    const s = Math.floor(t2 % 60);

    return { h, m, s };
  }, [currentDist, currentHours, currentMins, currentSecs, targetDist]);

  return (
    <Card className={`border shadow-xl overflow-hidden transition-colors duration-500 ${cardClasses[theme]}`}>
      <CardHeader className="bg-orange-500 text-white">
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-6 w-6" />
          מחשבון חיזוי ביצועים
        </CardTitle>
        <CardDescription className="text-orange-100">חזו את זמן הסיום שלכם למרוץ הבא על סמך הישגי העבר</CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-4">
            <Label className={`${theme === 'light' ? 'text-neutral-900' : 'text-neutral-100'} font-bold`}>הישג נוכחי (מרחק וזמן)</Label>
            <div className="flex gap-2">
              <Select value={currentDist} onValueChange={setCurrentDist}>
                <SelectTrigger className={`w-[120px] ${theme === 'light' ? 'bg-white' : 'bg-neutral-800 border-neutral-700'}`}>
                  <SelectValue placeholder="מרחק" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 ק"מ</SelectItem>
                  <SelectItem value="10">10 ק"מ</SelectItem>
                  <SelectItem value="21.1">חצי מרתון</SelectItem>
                  <SelectItem value="42.2">מרתון</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex items-center gap-1 flex-1">
                <Input 
                  type="number" 
                  placeholder="שעות" 
                  value={currentHours} 
                  onChange={(e) => setCurrentHours(e.target.value)}
                  className={`text-center ${theme === 'light' ? 'bg-white' : 'bg-neutral-800 border-neutral-700'}`}
                />
                <span>:</span>
                <Input 
                  type="number" 
                  placeholder="דקות" 
                  value={currentMins} 
                  onChange={(e) => setCurrentMins(e.target.value)}
                  className={`text-center ${theme === 'light' ? 'bg-white' : 'bg-neutral-800 border-neutral-700'}`}
                />
                <span>:</span>
                <Input 
                  type="number" 
                  placeholder="שניות" 
                  value={currentSecs} 
                  onChange={(e) => setCurrentSecs(e.target.value)}
                  className={`text-center ${theme === 'light' ? 'bg-white' : 'bg-neutral-800 border-neutral-700'}`}
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Label className={`${theme === 'light' ? 'text-neutral-900' : 'text-neutral-100'} font-bold`}>מרחק היעד</Label>
            <Select value={targetDist} onValueChange={setTargetDist}>
              <SelectTrigger className={theme === 'light' ? 'bg-white' : 'bg-neutral-800 border-neutral-700'}>
                <SelectValue placeholder="בחר מרחק יעד" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5 ק"מ</SelectItem>
                <SelectItem value="10">10 ק"מ</SelectItem>
                <SelectItem value="21.1">חצי מרתון</SelectItem>
                <SelectItem value="42.2">מרתון</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {prediction && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-neutral-900 rounded-2xl p-6 text-center text-white"
          >
            <p className="text-neutral-400 text-sm mb-2">זמן סיום חזוי ל-{targetDist} ק"מ:</p>
            <div className="text-4xl font-black text-orange-500 font-mono tracking-wider">
              {prediction.h > 0 && `${prediction.h}:`}{prediction.m.toString().padStart(2, '0')}:{prediction.s.toString().padStart(2, '0')}
            </div>
            <p className="text-xs text-neutral-500 mt-4 italic">
              * החיזוי מבוסס על נוסחת Riegel ומניח אימון מתאים למרחק היעד.
            </p>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState("basics");
  const [theme, setTheme] = useState<"dark" | "light" | "colorful">("dark");

  const themeClasses = {
    dark: "bg-neutral-950 text-neutral-100",
    light: "bg-neutral-50 text-neutral-900",
    colorful: "bg-indigo-950 text-white",
  };

  const cardClasses = {
    dark: "bg-neutral-900/50 border-neutral-800 text-neutral-100",
    light: "bg-white border-neutral-200 text-neutral-900",
    colorful: "bg-white/10 backdrop-blur-md border-white/20 text-white",
  };

  return (
    <div className={`min-h-screen font-sans selection:bg-orange-500/30 transition-colors duration-500 ${themeClasses[theme]}`} dir="rtl">
      {/* Navigation Tabs - Moved to Top */}
      <div className="sticky top-0 z-50 w-full backdrop-blur-xl shadow-md border-b transition-all duration-500 bg-white/80 dark:bg-neutral-900/80 border-neutral-200 dark:border-neutral-800">
        <div className="mx-auto max-w-7xl px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="overflow-x-auto no-scrollbar py-3">
              <TabsList className="h-auto flex w-max sm:w-full justify-start sm:justify-center gap-2 p-1 bg-transparent border-none shadow-none">
                {sections.map((section) => (
                  <TabsTrigger 
                    key={section.id} 
                    value={section.id}
                    className="flex items-center gap-2 px-4 py-2 data-[state=active]:bg-orange-500 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-xl transition-all duration-300 whitespace-nowrap font-bold hover:scale-105 active:scale-95 text-sm"
                  >
                    <section.icon className="h-4 w-4" />
                    <span>{section.title}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
          </Tabs>
        </div>
      </div>

      {/* Theme Switcher */}
      <div className="fixed top-4 left-4 z-50 flex gap-2">
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => setTheme("light")}
            className={`rounded-full shadow-lg transition-all ${theme === "light" ? "bg-orange-500 text-white border-orange-500" : "bg-white/10 backdrop-blur-md border-white/20"}`}
          >
            <Sun className="h-4 w-4" />
          </Button>
        </motion.div>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => setTheme("dark")}
            className={`rounded-full shadow-lg transition-all ${theme === "dark" ? "bg-orange-500 text-white border-orange-500" : "bg-white/10 backdrop-blur-md border-white/20"}`}
          >
            <Moon className="h-4 w-4" />
          </Button>
        </motion.div>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => setTheme("colorful")}
            className={`rounded-full shadow-lg transition-all ${theme === "colorful" ? "bg-orange-500 text-white border-orange-500" : "bg-white/10 backdrop-blur-md border-white/20"}`}
          >
            <Palette className="h-4 w-4" />
          </Button>
        </motion.div>
      </div>

      {/* Hero Section */}
      <header className="relative overflow-hidden pt-12 pb-24 sm:pt-16 sm:pb-32">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=2070&auto=format&fit=crop"
            alt="Runner"
            className="h-full w-full object-cover opacity-30"
            referrerPolicy="no-referrer"
          />
          <div className={`absolute inset-0 bg-gradient-to-t ${theme === 'light' ? 'from-neutral-50 via-neutral-50/40' : theme === 'colorful' ? 'from-indigo-950 via-indigo-950/40' : 'from-neutral-950 via-neutral-950/40'}`} />
        </div>
        
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <Badge className="mb-4 bg-orange-500 hover:bg-orange-600 text-white border-none px-3 py-1 text-sm font-bold tracking-wide">
              המדריך המלא לרץ
            </Badge>
            <h1 className="font-display text-5xl font-black tracking-tight text-white sm:text-7xl">
              רצים <span className="text-orange-500 italic">קדימה</span>
            </h1>
            <p className={`mt-6 text-xl leading-8 ${theme === 'light' ? 'text-neutral-600' : 'text-neutral-300'}`}>
              כל מה שאתם צריכים לדעת כדי להתחיל לרוץ, להתאמן למרוץ הראשון שלכם ולשמור על הגוף לאורך זמן.
            </p>
          </motion.div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
            >
              {/* Basics Section */}
              <TabsContent value="basics" className="mt-0">
                <div className="grid gap-8 lg:grid-cols-2">
                  <Card className={`border shadow-lg overflow-hidden transition-colors duration-500 ${cardClasses[theme]}`}>
                    <CardHeader className={`${theme === 'light' ? 'bg-neutral-900 text-white' : 'bg-white/5 text-white'}`}>
                      <CardTitle className="flex items-center gap-2 text-2xl">
                        <Navigation className="h-6 w-6 text-orange-500" />
                        איך לרוץ נכון?
                      </CardTitle>
                      <CardDescription className={theme === 'light' ? 'text-neutral-400' : 'text-neutral-500'}>היסודות לריצה בריאה ויעילה</CardDescription>
                    </CardHeader>
                    <CardContent className="p-8 space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-xl font-bold">1. יציבה וטכניקה</h3>
                        <p className={`${theme === 'light' ? 'text-neutral-600' : 'text-neutral-400'} leading-relaxed`}>
                          שמרו על גב ישר, מבט קדימה (לא לרגליים) וכתפיים רפויות. הידיים צריכות לנוע קדימה ואחורה בזווית של 90 מעלות, מבלי לחצות את קו האמצע של הגוף.
                        </p>
                      </div>
                      <div className="space-y-4">
                        <h3 className="text-xl font-bold">2. נחיתה נכונה</h3>
                        <p className={`${theme === 'light' ? 'text-neutral-600' : 'text-neutral-400'} leading-relaxed`}>
                          נסו לנחות על מרכז כף הרגל (Midfoot) ולא על העקב. זה מפחית את העומס על הברכיים והמפרקים. הצעדים צריכים להיות קצרים ומהירים (קאדנס גבוה).
                        </p>
                      </div>
                      <div className="space-y-4">
                        <h3 className="text-xl font-bold">3. נשימה</h3>
                        <p className={`${theme === 'light' ? 'text-neutral-600' : 'text-neutral-400'} leading-relaxed`}>
                          נשמו מהבטן ולא מהחזה. נסו לסנכרן את הנשימה עם הצעדים (למשל: 3 צעדים לשאיפה, 2 צעדים לנשיפה) כדי לשמור על קצב קבוע.
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="space-y-8">
                    <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
                      <Card className={`border shadow-md transition-colors duration-500 ${theme === 'light' ? 'bg-orange-50 border-orange-100' : 'bg-orange-500/10 border-orange-500/20'}`}>
                        <CardHeader>
                          <CardTitle className="text-orange-500">טיפים למתחילים</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex items-start gap-4">
                            <div className="bg-orange-500 p-2 rounded-lg text-white">
                              <Zap className="h-5 w-5" />
                            </div>
                            <div>
                              <h4 className="font-bold">הדרגתיות היא המפתח</h4>
                              <p className="text-neutral-500 text-sm">אל תנסו לרוץ 10 ק"מ ביום הראשון. התחילו בשילוב של הליכה וריצה.</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-4">
                            <div className="bg-orange-500 p-2 rounded-lg text-white">
                              <Heart className="h-5 w-5" />
                            </div>
                            <div>
                              <h4 className="font-bold">הקשיבו לגוף</h4>
                              <p className="text-neutral-500 text-sm">כאב הוא סימן לעצור. אל תתעלמו מפציעות קטנות שעלולות להפוך לגדולות.</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                    
                    <img 
                      src="https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?q=80&w=2070&auto=format&fit=crop" 
                      alt="Running technique" 
                      className="rounded-2xl shadow-xl w-full h-64 object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              </TabsContent>

              {/* Training Section */}
              <TabsContent value="training" className="mt-0">
                <div className="max-w-4xl mx-auto space-y-12">
                  <div className="text-center space-y-4">
                    <h2 className="text-3xl font-black text-neutral-900">איך להתאמן למרוץ?</h2>
                    <p className="text-neutral-600">תוכנית אימונים חכמה בונה סיבולת ומונעת פציעות.</p>
                  </div>

                  <div className="grid gap-6 grid-cols-1 sm:grid-cols-3">
                    {[
                      { title: "ריצות קלות", desc: "80% מהאימונים. קצב שבו ניתן לדבר בחופשיות.", color: "bg-blue-500" },
                      { title: "אימוני איכות", desc: "אינטרוולים או ריצות טמפו לשיפור המהירות.", color: "bg-purple-500" },
                      { title: "ריצה ארוכה", desc: "פעם בשבוע, להגדלת מרחק הריצה המקסימלי.", color: "bg-orange-500" },
                    ].map((item, i) => (
                      <motion.div key={i} whileHover={{ y: -5, scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
                        <Card className={`border shadow-md hover:shadow-lg transition-all duration-500 h-full ${cardClasses[theme]}`}>
                          <CardHeader>
                            <div className={`${item.color} w-12 h-12 rounded-xl mb-4 flex items-center justify-center text-white shadow-lg`}>
                              <Timer className="h-6 w-6" />
                            </div>
                            <CardTitle>{item.title}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className={`${theme === 'light' ? 'text-neutral-600' : 'text-neutral-400'} text-sm`}>{item.desc}</p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>

                  <RacePredictor theme={theme} cardClasses={cardClasses} />

                  <Accordion type="single" collapsible className={`w-full rounded-2xl shadow-md p-4 border transition-colors duration-500 ${cardClasses[theme]}`}>
                    <AccordionItem value="item-1">
                      <AccordionTrigger className="text-lg font-bold">כלל ה-10%</AccordionTrigger>
                      <AccordionContent className={theme === 'light' ? 'text-neutral-600' : 'text-neutral-400'}>
                        לעולם אל תעלו את מרחק הריצה השבועי ביותר מ-10% משבוע לשבוע. זהו הכלל החשוב ביותר למניעת פציעות עומס.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger className="text-lg font-bold">אימוני כוח</AccordionTrigger>
                      <AccordionContent className={theme === 'light' ? 'text-neutral-600' : 'text-neutral-400'}>
                        שלבו לפחות שני אימוני כוח בשבוע (רגליים, ליבה וגב). שרירים חזקים תומכים במפרקים ומייעלים את הריצה.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger className="text-lg font-bold">טייפרינג (Tapering)</AccordionTrigger>
                      <AccordionContent className={theme === 'light' ? 'text-neutral-600' : 'text-neutral-400'}>
                        בשבועיים שלפני המרוץ, הורידו את נפח האימונים כדי לאפשר לגוף להגיע רענן ומלא אנרגיה לקו הזינוק.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </TabsContent>

              {/* Gear Section */}
              <TabsContent value="gear" className="mt-0">
                <div className="grid gap-8 lg:grid-cols-2">
                  <div className="space-y-6">
                    <h2 className="text-3xl font-black">ציוד וטכנולוגיה</h2>
                    <p className={theme === 'light' ? 'text-neutral-600' : 'text-neutral-400'}>הציוד הנכון לא רק משפר את הביצועים, אלא בעיקר שומר על הבריאות שלכם.</p>
                    
                    <div className="grid gap-4 sm:grid-cols-2">
                      {[
                        { title: "נעלי ריצה", desc: "הפריט החשוב ביותר. מומלץ לבצע התאמה מקצועית בחנות מתמחה.", icon: ShoppingBag },
                        { title: "שעון דופק/GPS", desc: "למעקב אחרי קצב, מרחק ומדדי בריאות בזמן אמת.", icon: Timer },
                        { title: "ביגוד מנדף", desc: "בדים טכנולוגיים ששומרים על הגוף יבש ומונעים שפשופים.", icon: Zap },
                        { title: "גרבי ריצה", desc: "גרביים ללא תפרים למניעת שלפוחיות ואי-נוחות.", icon: ShieldAlert },
                      ].map((item, i) => (
                        <motion.div 
                          key={i} 
                          whileHover={{ scale: 1.05, rotate: 1 }}
                          className={`p-6 rounded-2xl border ${theme === 'light' ? 'bg-white border-neutral-100 shadow-sm' : 'bg-neutral-900/50 border-neutral-800'}`}
                        >
                          <item.icon className="h-8 w-8 text-orange-500 mb-4" />
                          <h4 className="font-bold mb-2">{item.title}</h4>
                          <p className="text-neutral-500 text-sm">{item.desc}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                    <img 
                      src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop" 
                      alt="Running Gear" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                      <p className="text-white font-bold italic">"אין מזג אוויר רע, יש רק ציוד לא מתאים"</p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Nutrition Section */}
              <TabsContent value="nutrition" className="mt-0">
                <div className="grid gap-8 lg:grid-cols-3">
                  <div className="lg:col-span-2 space-y-8">
                    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
                      <motion.div whileHover={{ scale: 1.02 }}>
                        <Card className={`border shadow-md transition-colors duration-500 h-full ${cardClasses[theme]}`}>
                          <CardHeader className="flex flex-row items-center gap-4">
                            <div className="bg-green-500/10 p-3 rounded-full text-green-500">
                              <Clock className="h-6 w-6" />
                            </div>
                            <div>
                              <CardTitle>יום לפני המרוץ</CardTitle>
                              <CardDescription className={theme === 'light' ? 'text-neutral-500' : 'text-neutral-400'}>מילוי מאגרי גליקוגן</CardDescription>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <ul className={`list-disc list-inside space-y-2 ${theme === 'light' ? 'text-neutral-600' : 'text-neutral-400'}`}>
                              <li>אכלו פחמימות מורכבות (פסטה, אורז, תפו"א).</li>
                              <li>הימנעו ממאכלים חדשים או חריפים.</li>
                              <li>שתו הרבה מים לאורך כל היום.</li>
                              <li>הפחיתו בצריכת סיבים כדי למנוע אי-נוחות.</li>
                            </ul>
                          </CardContent>
                        </Card>
                      </motion.div>

                      <motion.div whileHover={{ scale: 1.02 }}>
                        <Card className={`border shadow-md transition-colors duration-500 h-full ${cardClasses[theme]}`}>
                          <CardHeader className="flex flex-row items-center gap-4">
                            <div className="bg-blue-500/10 p-3 rounded-full text-blue-500">
                              <Coffee className="h-6 w-6" />
                            </div>
                            <div>
                              <CardTitle>שעה לפני הזינוק</CardTitle>
                              <CardDescription className={theme === 'light' ? 'text-neutral-500' : 'text-neutral-400'}>אנרגיה זמינה</CardDescription>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <ul className={`list-disc list-inside space-y-2 ${theme === 'light' ? 'text-neutral-600' : 'text-neutral-400'}`}>
                              <li>חטיף אנרגיה קטן או בננה.</li>
                              <li>פחמימות פשוטות שמתעכלות מהר.</li>
                              <li>שתו כ-200-300 מ"ל מים.</li>
                              <li>קפאין (אם אתם רגילים) לשיפור הריכוז.</li>
                            </ul>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </div>

                    <Card className={`border shadow-lg transition-colors duration-500 ${theme === 'light' ? 'bg-neutral-900 text-white' : 'bg-white/5 text-white'}`}>
                      <CardHeader>
                        <CardTitle className="text-2xl flex items-center gap-2">
                          <Droplets className="h-6 w-6 text-blue-400" />
                          בזמן המרוץ
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div className="space-y-4">
                          <h4 className="font-bold text-orange-400">תזונה</h4>
                          <p className="text-neutral-400 text-sm">
                            במרוצים ארוכים (מעל שעה), צרכו ג'ל אנרגיה או משקה איזוטוני כל 45-60 דקות כדי לשמור על רמות הסוכר.
                          </p>
                        </div>
                        <div className="space-y-4">
                          <h4 className="font-bold text-blue-400">שתייה</h4>
                          <p className="text-neutral-400 text-sm">
                            שתו בלגימות קטנות בכל תחנת רענון. אל תחכו לתחושת צמא - זה סימן מאוחר מדי להתייבשות.
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="space-y-6">
                    <Card className={`border shadow-md transition-colors duration-500 ${theme === 'light' ? 'bg-green-50 border-green-100' : 'bg-green-500/10 border-green-500/20'}`}>
                      <CardHeader>
                        <CardTitle className="text-green-500 flex items-center gap-2">
                          <Utensils className="h-5 w-5" />
                          אחרי המרוץ
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className={`${theme === 'light' ? 'text-green-800' : 'text-green-400'} text-sm font-medium`}>
                          "חלון ההזדמנויות": ב-30-60 הדקות שאחרי הריצה, הגוף זקוק לשיקום מהיר.
                        </p>
                        <div className="space-y-2">
                          <div className={`flex justify-between text-xs font-bold ${theme === 'light' ? 'text-green-700' : 'text-green-500'} uppercase tracking-wider`}>
                            <span>חלבון</span>
                            <span>לשיקום השריר</span>
                          </div>
                          <div className="h-2 bg-green-500/20 rounded-full overflow-hidden">
                            <div className="h-full bg-green-600 w-3/4" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className={`flex justify-between text-xs font-bold ${theme === 'light' ? 'text-green-700' : 'text-green-500'} uppercase tracking-wider`}>
                            <span>פחמימות</span>
                            <span>למילוי מאגרים</span>
                          </div>
                          <div className="h-2 bg-green-500/20 rounded-full overflow-hidden">
                            <div className="h-full bg-green-600 w-full" />
                          </div>
                        </div>
                        <p className="text-neutral-500 text-xs mt-4 italic">
                          דוגמה: שייק חלבון עם בננה, כריך טונה, או יוגורט עם גרנולה.
                        </p>
                      </CardContent>
                    </Card>

                    <div className={`p-6 rounded-2xl shadow-md border transition-colors duration-500 ${cardClasses[theme]}`}>
                      <h4 className="font-bold mb-4">כלל הזהב</h4>
                      <p className={`${theme === 'light' ? 'text-neutral-600' : 'text-neutral-400'} text-sm`}>
                        "שום דבר חדש ביום המרוץ". נסו את כל הג'לים, המשקאות והמאכלים בזמן האימונים הארוכים שלכם.
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Warmup Section */}
              <TabsContent value="warmup" className="mt-0">
                <div className="grid gap-8 lg:grid-cols-2">
                  <div className="space-y-6">
                    <h2 className="text-3xl font-black">איך להתחיל אימון?</h2>
                    <p className={theme === 'light' ? 'text-neutral-600' : 'text-neutral-400'}>חימום נכון מכין את מערכת העצבים, השרירים והלב למאמץ.</p>
                    
                    <div className="space-y-4">
                      {[
                        { 
                          title: "הליכה מהירה / ריצה קלה", 
                          time: "5-10 דקות", 
                          desc: "להעלאת טמפרטורת הגוף וזרימת הדם.",
                          img: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&q=80&w=400"
                        },
                        { 
                          title: "מתיחות דינמיות", 
                          time: "5-8 דקות", 
                          desc: "הנפות רגליים (קדימה-אחורה ולצדדים), סיבובי אגן, מכרעים (Lunges) בתנועה, וסיבובי זרועות. מטרתן להגדיל את טווח התנועה במפרקים.",
                          img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=400"
                        },
                        { 
                          title: "תרגילי טכניקה (Drills)", 
                          time: "3-5 דקות", 
                          desc: "הרמות ברכיים (High Knees), עקבים לישבן (Butt Kicks), וצעדי רדיפה. תרגילים אלו משפרים את הקואורדינציה והיעילות.",
                          img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=400"
                        },
                        { 
                          title: "מתגברות (Strides)", 
                          time: "2 דקות", 
                          desc: "3-4 ריצות קצרות של 60-80 מטר בקצב הדרגתי עולה, כדי להכין את הגוף לקצב המרוץ.",
                          img: "https://images.unsplash.com/photo-1434682881908-b43d0467b798?auto=format&fit=crop&q=80&w=400"
                        },
                      ].map((step, i) => (
                        <motion.div 
                          key={i} 
                          whileHover={{ scale: 1.02 }}
                          className={`flex flex-col sm:flex-row gap-4 p-4 rounded-xl shadow-sm border ${theme === 'light' ? 'bg-white border-neutral-100' : 'bg-neutral-900/50 border-neutral-800'}`}
                        >
                          <div className="flex-shrink-0 w-full sm:w-24 h-24 rounded-lg overflow-hidden">
                            <img src={step.img} alt={step.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-bold">{step.title}</h4>
                              <Badge variant="secondary" className="text-[10px]">{step.time}</Badge>
                            </div>
                            <p className="text-neutral-500 text-sm mt-1">{step.desc}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className="relative group hidden lg:block">
                    <img 
                      src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop" 
                      alt="Warmup" 
                      className="rounded-3xl shadow-2xl w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-orange-500/10 rounded-3xl group-hover:bg-transparent transition-colors duration-500" />
                  </div>
                </div>
              </TabsContent>

              {/* Recovery Section */}
              <TabsContent value="recovery" className="mt-0">
                <div className="max-w-5xl mx-auto space-y-12">
                  <div className="text-center space-y-4">
                    <h2 className="text-3xl font-black">התאוששות: הסוד לשיפור</h2>
                    <p className={theme === 'light' ? 'text-neutral-600' : 'text-neutral-400'}>השיפור בכושר קורה בזמן המנוחה, לא בזמן הריצה.</p>
                  </div>

                  <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                    {[
                      { icon: Moon, title: "שינה איכותית", desc: "7-9 שעות בלילה. זהו הזמן שבו הגוף מפריש הורמוני גדילה ומשקם רקמות.", color: "bg-indigo-500/10 text-indigo-500" },
                      { icon: Droplets, title: "אמבטיות קרח", desc: "מפחיתות דלקתיות וכאבי שרירים (DOMS) אחרי אימונים עצימים במיוחד.", color: "bg-blue-500/10 text-blue-500" },
                      { icon: Dumbbell, title: "שחרור פעיל", desc: "הליכה קלה, שחייה או רכיבה רגועה ביום שאחרי ריצה קשה להזרמת דם.", color: "bg-orange-500/10 text-orange-500" },
                      { icon: Heart, title: "עיסוי / גליל", desc: "שימוש ב-Foam Roller לשחרור קשרים בשרירים ושיפור הגמישות.", color: "bg-rose-500/10 text-rose-500" },
                    ].map((item, i) => (
                      <motion.div key={i} whileHover={{ y: -5 }} className={`rounded-2xl p-6 text-center border ${theme === 'light' ? 'bg-white border-neutral-100 shadow-md' : 'bg-neutral-900/50 border-neutral-800 shadow-xl'}`}>
                        <div className={`mx-auto w-16 h-16 ${item.color} rounded-2xl flex items-center justify-center mb-4`}>
                          <item.icon className="h-8 w-8" />
                        </div>
                        <h4 className="font-bold mb-2">{item.title}</h4>
                        <p className="text-neutral-500 text-xs">{item.desc}</p>
                      </motion.div>
                    ))}
                  </div>

                  <div className="grid gap-8 lg:grid-cols-2">
                    <Card className={`border-none shadow-xl p-8 rounded-3xl ${theme === 'light' ? 'bg-white' : 'bg-neutral-900/50 border-neutral-800'}`}>
                      <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <Target className="h-6 w-6 text-orange-500" />
                        מתיחות סטטיות (אחרי הריצה)
                      </h3>
                      <div className="space-y-4">
                        {[
                          { title: "שרירי התאומים", desc: "הישענו על קיר, רגל אחת קדימה כפופה והשנייה ישרה מאחור. החזיקו 30-45 שניות לכל צד.", img: "https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&q=80&w=300" },
                          { title: "ירך אחורית (Hamstrings)", desc: "בישיבה או עמידה, שלחו רגל קדימה והתכופפו לכיוון הבהונות עם גב ישר.", img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=300" },
                          { title: "ארבע-ראשי (Quads)", desc: "בעמידה על רגל אחת, אחזו בקרסול הרגל השנייה ומשכו לכיוון הישבן.", img: "https://images.unsplash.com/photo-1552196564-977484372551?auto=format&fit=crop&q=80&w=300" },
                        ].map((ex, i) => (
                          <motion.div key={i} whileHover={{ x: -10 }} className={`flex gap-4 p-4 rounded-xl ${theme === 'light' ? 'bg-neutral-50' : 'bg-neutral-800/50'}`}>
                            <img src={ex.img} alt={ex.title} className="w-16 h-16 rounded-lg object-cover" referrerPolicy="no-referrer" />
                            <div>
                              <h4 className="font-bold">{ex.title}</h4>
                              <p className="text-neutral-500 text-sm">{ex.desc}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </Card>

                    <Card className={`border-none shadow-xl p-8 rounded-3xl ${theme === 'light' ? 'bg-white' : 'bg-neutral-900/50 border-neutral-800'}`}>
                      <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <Dumbbell className="h-6 w-6 text-orange-500" />
                        עבודה עם גליל (Foam Rolling)
                      </h3>
                      <div className="space-y-4">
                        {[
                          { title: "IT Band (צד הירך)", desc: "שכבו על הצד כשהגליל מתחת לירך. התגלגלו מהאגן ועד מעל הברך באיטיות.", img: "https://images.unsplash.com/photo-1518611012118-29617b0ccd0a?auto=format&fit=crop&q=80&w=300" },
                          { title: "שרירי התאומים", desc: "שבו על הרצפה כשהגליל מתחת לשוקיים. הרימו את האגן והתגלגלו קדימה ואחורה.", img: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&q=80&w=300" },
                          { title: "גב עליון", desc: "שכבו על הגב כשהגליל מתחת לשכמות. שלבו ידיים מאחורי הראש והתגלגלו בעדינות.", img: "https://images.unsplash.com/photo-1518611012118-29617b0ccd0a?auto=format&fit=crop&q=80&w=300" },
                        ].map((ex, i) => (
                          <motion.div key={i} whileHover={{ x: -10 }} className={`flex gap-4 p-4 rounded-xl ${theme === 'light' ? 'bg-neutral-50' : 'bg-neutral-800/50'}`}>
                            <img src={ex.img} alt={ex.title} className="w-16 h-16 rounded-lg object-cover" referrerPolicy="no-referrer" />
                            <div>
                              <h4 className="font-bold">{ex.title}</h4>
                              <p className="text-neutral-500 text-sm">{ex.desc}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </Card>
                  </div>
                </div>
              </TabsContent>
              {/* Injuries Section */}
              <TabsContent value="injuries" className="mt-0">
                <div className="max-w-4xl mx-auto space-y-8">
                  <div className="text-center space-y-4">
                    <h2 className="text-3xl font-black">מניעת פציעות וטיפול</h2>
                    <p className={theme === 'light' ? 'text-neutral-600' : 'text-neutral-400'}>הדרך הטובה ביותר לטפל בפציעה היא למנוע אותה מראש.</p>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    {[
                      { title: "שין ספלינט (Shin Splints)", desc: "כאבים בקדמת השוק. נגרם לרוב מעלייה חדה מדי בעומס או נעליים לא מתאימות.", treatment: "מנוחה, קרח, והורדת עומס הדרגתית." },
                      { title: "ברך רצים (Runner's Knee)", desc: "כאב סביב הפיקה. נגרם מחולשת שרירי ליבה ואגן.", treatment: "חיזוק שרירי הארבע-ראשי והישבן." },
                      { title: "דלקת בגיד אכילס", desc: "כאב בחלק האחורי של העקב. נגרם מחוסר גמישות בתאומים.", treatment: "מתיחות עדינות ועבודה על טווחי תנועה." },
                      { title: "פלאנטר פאסיטיס", desc: "כאב בכף הרגל, במיוחד בבוקר. נגרם מעומס יתר על הקשת.", treatment: "עיסוי עם כדור טניס ומתיחות לכף הרגל." },
                    ].map((injury, i) => (
                      <motion.div 
                        key={i} 
                        whileHover={{ x: -10 }}
                        className={`p-6 rounded-2xl border ${theme === 'light' ? 'bg-white border-neutral-100 shadow-md' : 'bg-neutral-900/50 border-neutral-800'}`}
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <ShieldAlert className="h-6 w-6 text-rose-500" />
                          <h4 className="font-bold text-lg">{injury.title}</h4>
                        </div>
                        <p className="text-neutral-500 text-sm mb-4">{injury.desc}</p>
                        <div className={`p-3 rounded-lg text-xs ${theme === 'light' ? 'bg-rose-50 text-rose-700' : 'bg-rose-500/10 text-rose-400'}`}>
                          <span className="font-bold">טיפול מומלץ:</span> {injury.treatment}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <Card className={`border shadow-lg p-8 rounded-3xl ${theme === 'light' ? 'bg-blue-50 border-blue-100' : 'bg-blue-500/10 border-blue-500/20'}`}>
                    <div className="flex flex-col sm:flex-row items-center gap-6">
                      <div className="bg-blue-500 text-white p-4 rounded-2xl">
                        <Info className="h-12 w-12" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-xl font-bold">מתי לפנות לרופא?</h3>
                        <p className="text-neutral-500">אם הכאב אינו חולף לאחר יומיים של מנוחה, אם יש נפיחות משמעותית, או אם הכאב מונע מכם ללכת בצורה תקינה - אל תהססו לפנות לייעוץ מקצועי.</p>
                      </div>
                    </div>
                  </Card>
                </div>
              </TabsContent>

              {/* FAQ Section */}
              <TabsContent value="faq" className="mt-0">
                <div className="max-w-3xl mx-auto space-y-8">
                  <div className="text-center space-y-4">
                    <h2 className="text-3xl font-black">שאלות ותשובות (FAQ)</h2>
                    <p className={theme === 'light' ? 'text-neutral-600' : 'text-neutral-400'}>כל מה שרציתם לדעת על ריצה במקום אחד.</p>
                  </div>

                  <Accordion type="single" collapsible className={`w-full rounded-3xl shadow-xl p-6 border transition-all duration-500 ${cardClasses[theme]}`}>
                    {[
                      { 
                        q: "כמה פעמים בשבוע כדאי לרוץ למתחילים?", 
                        a: "למתחילים מומלץ להתחיל ב-3 פעמים בשבוע, עם ימי מנוחה ביניהם. חשוב לתת לגוף זמן להסתגל לעומס החדש." 
                      },
                      { 
                        q: "האם ריצה פוגעת בברכיים?", 
                        a: "מחקרים מראים שריצה נכונה עם נעליים מתאימות והדרגתיות בעומס דווקא מחזקת את המפרקים. פציעות ברכיים נגרמות לרוב מעומס יתר פתאומי או טכניקה לקויה." 
                      },
                      { 
                        q: "מה כדאי לאכול לפני ריצת בוקר?", 
                        a: "אם הריצה קצרה (עד 45 דקות), אפשר לרוץ על קיבה ריקה או לאכול תמר/בננה. לריצות ארוכות יותר כדאי לאכול פחמימה פשוטה כ-30 דקות לפני." 
                      },
                      { 
                        q: "איך בוחרים נעלי ריצה נכונות?", 
                        a: "מומלץ להגיע לחנות מתמחה ולבצע בדיקת מסילה. הנעל צריכה להיות גדולה בחצי מידה מנעל רגילה כדי לאפשר לכף הרגל להתרחב בזמן הריצה." 
                      },
                      { 
                        q: "מתי כדאי להחליף נעלי ריצה?", 
                        a: "בממוצע כל 600-800 קילומטרים. אם אתם מרגישים שהשיכוך ירד או שיש כאבים חדשים, זה זמן טוב לבדוק את הנעליים." 
                      },
                      { 
                        q: "איך נמנעים משפשפות בריצה?", 
                        a: "שימוש בביגוד מנדף זיעה צמוד, ומריחת וזלין או קרם ייעודי נגד שפשפות באזורי החיכוך (ירכיים, בית שחי)." 
                      }
                    ].map((item, i) => (
                      <AccordionItem key={i} value={`faq-${i}`} className="border-b last:border-0 border-neutral-200 dark:border-neutral-800">
                        <AccordionTrigger className="text-right font-bold py-4 hover:text-orange-500 transition-colors">
                          {item.q}
                        </AccordionTrigger>
                        <AccordionContent className="text-neutral-500 leading-relaxed pb-4">
                          {item.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <motion.div whileHover={{ scale: 1.02 }} className={`p-6 rounded-3xl border text-center ${theme === 'light' ? 'bg-orange-50 border-orange-100' : 'bg-orange-500/10 border-orange-500/20'}`}>
                      <Mail className="h-8 w-8 text-orange-500 mx-auto mb-4" />
                      <h4 className="font-bold mb-2">יש לכם עוד שאלות?</h4>
                      <p className="text-sm text-neutral-500 mb-4">הצוות המקצועי שלנו כאן בשבילכם לכל התייעצות.</p>
                      <Button variant="outline" className="rounded-xl border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white transition-all">שלחו לנו מייל</Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.02 }} className={`p-6 rounded-3xl border text-center ${theme === 'light' ? 'bg-blue-50 border-blue-100' : 'bg-blue-500/10 border-blue-500/20'}`}>
                      <Users className="h-8 w-8 text-blue-500 mx-auto mb-4" />
                      <h4 className="font-bold mb-2">קהילת הרצים שלנו</h4>
                      <p className="text-sm text-neutral-500 mb-4">הצטרפו לקבוצת הווטסאפ שלנו לקבלת טיפים יומיים.</p>
                      <Button variant="outline" className="rounded-xl border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-all">הצטרפו לקהילה</Button>
                    </motion.div>
                  </div>
                </div>
              </TabsContent>
            </motion.div>
          </AnimatePresence>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className={`py-12 mt-24 border-t ${theme === 'light' ? 'bg-white border-neutral-200 text-neutral-900' : 'bg-neutral-900 text-white border-neutral-800'}`}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Activity className="h-8 w-8 text-orange-500" />
                <span className="font-display text-2xl font-black tracking-tighter">רצים קדימה</span>
              </div>
              <p className="text-neutral-500 text-sm">
                המדריך המקיף ביותר לריצה בעברית. אנחנו כאן כדי לעזור לכם להגיע לקו הסיום בחיוך.
              </p>
              <div className="flex gap-4">
                <a href="https://www.linkedin.com/in/noamgold" target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-orange-500 transition-colors">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="mailto:goldnoamai@gmail.com" className="text-neutral-500 hover:text-orange-500 transition-colors">
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-bold text-lg">קישורים נוספים</h4>
              <ul className="space-y-2 text-sm text-neutral-500">
                <li>
                  <a href="https://noamgoldai.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:text-orange-500 flex items-center gap-2">
                    <ExternalLink className="h-3 w-3" />
                    Noam Gold AI
                  </a>
                </li>
                <li>
                  <a href="https://noam-gold-games.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:text-orange-500 flex items-center gap-2">
                    <ExternalLink className="h-3 w-3" />
                    משחקים נוספים
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-bold text-lg">משוב</h4>
              <p className="text-sm text-neutral-500">נשמח לשמוע מכם! שלחו לנו הודעה לכתובת:</p>
              <a href="mailto:goldnoamai@gmail.com" className="text-orange-500 font-bold hover:underline">goldnoamai@gmail.com</a>
            </div>
          </div>

          <div className="pt-8 border-t border-neutral-800 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-neutral-600 text-xs">© Noam Gold AI 2026. כל הזכויות שמורות.</p>
            <div className="flex gap-6 text-xs text-neutral-600">
              <span>נוצר באהבה לקהילת הרצים בישראל</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
