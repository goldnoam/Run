/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
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
  Coffee
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

const sections = [
  { id: "basics", title: "איך לרוץ נכון", icon: Activity },
  { id: "training", title: "תוכנית אימונים", icon: TrendingUp },
  { id: "nutrition", title: "תזונה והידרציה", icon: Apple },
  { id: "warmup", title: "חימום והכנה", icon: Flame },
  { id: "recovery", title: "התאוששות", icon: Moon },
];

export default function App() {
  const [activeTab, setActiveTab] = useState("basics");

  return (
    <div className="min-h-screen bg-neutral-50 font-sans selection:bg-orange-200 selection:text-orange-900" dir="rtl">
      {/* Hero Section */}
      <header className="relative overflow-hidden bg-neutral-900 py-24 sm:py-32">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=2070&auto=format&fit=crop"
            alt="Runner"
            className="h-full w-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/40" />
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
            <p className="mt-6 text-xl leading-8 text-neutral-300">
              כל מה שאתם צריכים לדעת כדי להתחיל לרוץ, להתאמן למרוץ הראשון שלכם ולשמור על הגוף לאורך זמן.
            </p>
          </motion.div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <main className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="sticky top-4 z-40 mb-12 flex justify-center">
            <TabsList className="h-auto flex-wrap justify-center gap-2 bg-white/80 p-2 backdrop-blur-md shadow-xl border border-neutral-200 rounded-2xl">
              {sections.map((section) => (
                <TabsTrigger 
                  key={section.id} 
                  value={section.id}
                  className="flex items-center gap-2 px-4 py-2.5 data-[state=active]:bg-orange-500 data-[state=active]:text-white rounded-xl transition-all duration-300"
                >
                  <section.icon className="h-4 w-4" />
                  <span className="font-bold">{section.title}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

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
                  <Card className="border-none shadow-lg overflow-hidden bg-white">
                    <CardHeader className="bg-neutral-900 text-white">
                      <CardTitle className="flex items-center gap-2 text-2xl">
                        <Navigation className="h-6 w-6 text-orange-500" />
                        איך לרוץ נכון?
                      </CardTitle>
                      <CardDescription className="text-neutral-400">היסודות לריצה בריאה ויעילה</CardDescription>
                    </CardHeader>
                    <CardContent className="p-8 space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-xl font-bold text-neutral-900">1. יציבה וטכניקה</h3>
                        <p className="text-neutral-600 leading-relaxed">
                          שמרו על גב ישר, מבט קדימה (לא לרגליים) וכתפיים רפויות. הידיים צריכות לנוע קדימה ואחורה בזווית של 90 מעלות, מבלי לחצות את קו האמצע של הגוף.
                        </p>
                      </div>
                      <div className="space-y-4">
                        <h3 className="text-xl font-bold text-neutral-900">2. נחיתה נכונה</h3>
                        <p className="text-neutral-600 leading-relaxed">
                          נסו לנחות על מרכז כף הרגל (Midfoot) ולא על העקב. זה מפחית את העומס על הברכיים והמפרקים. הצעדים צריכים להיות קצרים ומהירים (קאדנס גבוה).
                        </p>
                      </div>
                      <div className="space-y-4">
                        <h3 className="text-xl font-bold text-neutral-900">3. נשימה</h3>
                        <p className="text-neutral-600 leading-relaxed">
                          נשמו מהבטן ולא מהחזה. נסו לסנכרן את הנשימה עם הצעדים (למשל: 3 צעדים לשאיפה, 2 צעדים לנשיפה) כדי לשמור על קצב קבוע.
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="space-y-8">
                    <Card className="border-none shadow-md bg-orange-50">
                      <CardHeader>
                        <CardTitle className="text-orange-900">טיפים למתחילים</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-start gap-4">
                          <div className="bg-orange-500 p-2 rounded-lg text-white">
                            <Zap className="h-5 w-5" />
                          </div>
                          <div>
                            <h4 className="font-bold text-orange-900">הדרגתיות היא המפתח</h4>
                            <p className="text-orange-800/80 text-sm">אל תנסו לרוץ 10 ק"מ ביום הראשון. התחילו בשילוב של הליכה וריצה.</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-4">
                          <div className="bg-orange-500 p-2 rounded-lg text-white">
                            <Heart className="h-5 w-5" />
                          </div>
                          <div>
                            <h4 className="font-bold text-orange-900">הקשיבו לגוף</h4>
                            <p className="text-orange-800/80 text-sm">כאב הוא סימן לעצור. אל תתעלמו מפציעות קטנות שעלולות להפוך לגדולות.</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
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
                <div className="max-w-4xl mx-auto space-y-8">
                  <div className="text-center space-y-4">
                    <h2 className="text-3xl font-black text-neutral-900">איך להתאמן למרוץ?</h2>
                    <p className="text-neutral-600">תוכנית אימונים חכמה בונה סיבולת ומונעת פציעות.</p>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-3">
                    {[
                      { title: "ריצות קלות", desc: "80% מהאימונים. קצב שבו ניתן לדבר בחופשיות.", color: "bg-blue-500" },
                      { title: "אימוני איכות", desc: "אינטרוולים או ריצות טמפו לשיפור המהירות.", color: "bg-purple-500" },
                      { title: "ריצה ארוכה", desc: "פעם בשבוע, להגדלת מרחק הריצה המקסימלי.", color: "bg-orange-500" },
                    ].map((item, i) => (
                      <Card key={i} className="border-none shadow-md hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <div className={`${item.color} w-12 h-12 rounded-xl mb-4 flex items-center justify-center text-white`}>
                            <Timer className="h-6 w-6" />
                          </div>
                          <CardTitle>{item.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-neutral-600 text-sm">{item.desc}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <Accordion type="single" collapsible className="w-full bg-white rounded-2xl shadow-md p-4">
                    <AccordionItem value="item-1">
                      <AccordionTrigger className="text-lg font-bold">כלל ה-10%</AccordionTrigger>
                      <AccordionContent className="text-neutral-600">
                        לעולם אל תעלו את מרחק הריצה השבועי ביותר מ-10% משבוע לשבוע. זהו הכלל החשוב ביותר למניעת פציעות עומס.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger className="text-lg font-bold">אימוני כוח</AccordionTrigger>
                      <AccordionContent className="text-neutral-600">
                        שלבו לפחות שני אימוני כוח בשבוע (רגליים, ליבה וגב). שרירים חזקים תומכים במפרקים ומייעלים את הריצה.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger className="text-lg font-bold">טייפרינג (Tapering)</AccordionTrigger>
                      <AccordionContent className="text-neutral-600">
                        בשבועיים שלפני המרוץ, הורידו את נפח האימונים כדי לאפשר לגוף להגיע רענן ומלא אנרגיה לקו הזינוק.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </TabsContent>

              {/* Nutrition Section */}
              <TabsContent value="nutrition" className="mt-0">
                <div className="grid gap-8 lg:grid-cols-3">
                  <div className="lg:col-span-2 space-y-8">
                    <div className="grid gap-6 sm:grid-cols-2">
                      <Card className="border-none shadow-md">
                        <CardHeader className="flex flex-row items-center gap-4">
                          <div className="bg-green-100 p-3 rounded-full text-green-600">
                            <Clock className="h-6 w-6" />
                          </div>
                          <div>
                            <CardTitle>יום לפני המרוץ</CardTitle>
                            <CardDescription>מילוי מאגרי גליקוגן</CardDescription>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <ul className="list-disc list-inside space-y-2 text-neutral-600">
                            <li>אכלו פחמימות מורכבות (פסטה, אורז, תפו"א).</li>
                            <li>הימנעו ממאכלים חדשים או חריפים.</li>
                            <li>שתו הרבה מים לאורך כל היום.</li>
                            <li>הפחיתו בצריכת סיבים כדי למנוע אי-נוחות.</li>
                          </ul>
                        </CardContent>
                      </Card>

                      <Card className="border-none shadow-md">
                        <CardHeader className="flex flex-row items-center gap-4">
                          <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                            <Coffee className="h-6 w-6" />
                          </div>
                          <div>
                            <CardTitle>שעה לפני הזינוק</CardTitle>
                            <CardDescription>אנרגיה זמינה</CardDescription>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <ul className="list-disc list-inside space-y-2 text-neutral-600">
                            <li>חטיף אנרגיה קטן או בננה.</li>
                            <li>פחמימות פשוטות שמתעכלות מהר.</li>
                            <li>שתו כ-200-300 מ"ל מים.</li>
                            <li>קפאין (אם אתם רגילים) לשיפור הריכוז.</li>
                          </ul>
                        </CardContent>
                      </Card>
                    </div>

                    <Card className="border-none shadow-lg bg-neutral-900 text-white">
                      <CardHeader>
                        <CardTitle className="text-2xl flex items-center gap-2">
                          <Droplets className="h-6 w-6 text-blue-400" />
                          בזמן המרוץ
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="grid sm:grid-cols-2 gap-8">
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
                    <Card className="border-none shadow-md bg-green-50">
                      <CardHeader>
                        <CardTitle className="text-green-900 flex items-center gap-2">
                          <Utensils className="h-5 w-5" />
                          אחרי המרוץ
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-green-800 text-sm font-medium">
                          "חלון ההזדמנויות": ב-30-60 הדקות שאחרי הריצה, הגוף זקוק לשיקום מהיר.
                        </p>
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs font-bold text-green-700 uppercase tracking-wider">
                            <span>חלבון</span>
                            <span>לשיקום השריר</span>
                          </div>
                          <div className="h-2 bg-green-200 rounded-full overflow-hidden">
                            <div className="h-full bg-green-600 w-3/4" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs font-bold text-green-700 uppercase tracking-wider">
                            <span>פחמימות</span>
                            <span>למילוי מאגרים</span>
                          </div>
                          <div className="h-2 bg-green-200 rounded-full overflow-hidden">
                            <div className="h-full bg-green-600 w-full" />
                          </div>
                        </div>
                        <p className="text-green-800/70 text-xs mt-4 italic">
                          דוגמה: שייק חלבון עם בננה, כריך טונה, או יוגורט עם גרנולה.
                        </p>
                      </CardContent>
                    </Card>

                    <div className="p-6 bg-white rounded-2xl shadow-md border border-neutral-100">
                      <h4 className="font-bold mb-4">כלל הזהב</h4>
                      <p className="text-neutral-600 text-sm">
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
                    <h2 className="text-3xl font-black text-neutral-900">איך להתחיל אימון?</h2>
                    <p className="text-neutral-600">חימום נכון מכין את מערכת העצבים, השרירים והלב למאמץ.</p>
                    
                    <div className="space-y-4">
                      {[
                        { title: "הליכה מהירה / ריצה קלה", time: "5-10 דקות", desc: "להעלאת טמפרטורת הגוף וזרימת הדם." },
                        { title: "מתיחות דינמיות", time: "5 דקות", desc: "סיבובי רגליים, הנפות ידיים, לאנג'ים בתנועה. לא מתיחות סטטיות!" },
                        { title: "תרגילי טכניקה (Drills)", time: "3 דקות", desc: "הרמות ברכיים, עקבים לישבן, צעדי רדיפה." },
                      ].map((step, i) => (
                        <div key={i} className="flex gap-4 p-4 bg-white rounded-xl shadow-sm border border-neutral-100">
                          <div className="flex-shrink-0 w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold">
                            {i + 1}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-bold">{step.title}</h4>
                              <Badge variant="secondary" className="text-[10px]">{step.time}</Badge>
                            </div>
                            <p className="text-neutral-500 text-sm mt-1">{step.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="relative group">
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
                    <h2 className="text-3xl font-black text-neutral-900">התאוששות: הסוד לשיפור</h2>
                    <p className="text-neutral-600">השיפור בכושר קורה בזמן המנוחה, לא בזמן הריצה.</p>
                  </div>

                  <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    <Card className="border-none shadow-md text-center p-6">
                      <div className="mx-auto w-16 h-16 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mb-4">
                        <Moon className="h-8 w-8" />
                      </div>
                      <h4 className="font-bold mb-2">שינה איכותית</h4>
                      <p className="text-neutral-500 text-xs">7-9 שעות בלילה. זהו הזמן שבו הגוף מפריש הורמוני גדילה ומשקם רקמות.</p>
                    </Card>

                    <Card className="border-none shadow-md text-center p-6">
                      <div className="mx-auto w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-4">
                        <Droplets className="h-8 w-8" />
                      </div>
                      <h4 className="font-bold mb-2">אמבטיות קרח</h4>
                      <p className="text-neutral-500 text-xs">מפחיתות דלקתיות וכאבי שרירים (DOMS) אחרי אימונים עצימים במיוחד.</p>
                    </Card>

                    <Card className="border-none shadow-md text-center p-6">
                      <div className="mx-auto w-16 h-16 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mb-4">
                        <Dumbbell className="h-8 w-8" />
                      </div>
                      <h4 className="font-bold mb-2">שחרור פעיל</h4>
                      <p className="text-neutral-500 text-xs">הליכה קלה, שחייה או רכיבה רגועה ביום שאחרי ריצה קשה להזרמת דם.</p>
                    </Card>

                    <Card className="border-none shadow-md text-center p-6">
                      <div className="mx-auto w-16 h-16 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center mb-4">
                        <Heart className="h-8 w-8" />
                      </div>
                      <h4 className="font-bold mb-2">עיסוי / גליל</h4>
                      <p className="text-neutral-500 text-xs">שימוש ב-Foam Roller לשחרור קשרים בשרירים ושיפור הגמישות.</p>
                    </Card>
                  </div>

                  <div className="bg-white p-8 rounded-3xl shadow-xl border border-neutral-100 flex flex-col md:flex-row items-center gap-8">
                    <div className="flex-1 space-y-4">
                      <h3 className="text-2xl font-bold">מתיחות סטטיות</h3>
                      <p className="text-neutral-600">
                        בניגוד לחימום, אחרי הריצה זה הזמן למתיחות סטטיות. החזיקו כל מתיחה לפחות 30 שניות. התמקדו בשרירי התאומים, הירך האחורית (Hamstrings) והארבע-ראשי.
                      </p>
                      <div className="flex gap-2">
                        <Badge variant="outline">תאומים</Badge>
                        <Badge variant="outline">ירך אחורית</Badge>
                        <Badge variant="outline">גב תחתון</Badge>
                      </div>
                    </div>
                    <div className="w-full md:w-1/3 aspect-video bg-neutral-100 rounded-2xl flex items-center justify-center">
                      <Info className="h-12 w-12 text-neutral-300" />
                    </div>
                  </div>
                </div>
              </TabsContent>
            </motion.div>
          </AnimatePresence>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="bg-neutral-900 text-white py-12 mt-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <div className="flex justify-center items-center gap-2 mb-6">
            <Activity className="h-8 w-8 text-orange-500" />
            <span className="font-display text-2xl font-black tracking-tighter">רצים קדימה</span>
          </div>
          <p className="text-neutral-500 text-sm max-w-md mx-auto">
            המידע במדריך זה נועד להעשרה בלבד. לפני תחילת פעילות גופנית מאומצת מומלץ להתייעץ עם רופא ומאמן מוסמך.
          </p>
          <div className="mt-8 pt-8 border-t border-neutral-800 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-neutral-600 text-xs">© 2024 רצים קדימה. כל הזכויות שמורות.</p>
            <div className="flex gap-6">
              <a href="#" className="text-neutral-500 hover:text-white transition-colors">אינסטגרם</a>
              <a href="#" className="text-neutral-500 hover:text-white transition-colors">פייסבוק</a>
              <a href="#" className="text-neutral-500 hover:text-white transition-colors">קהילה</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
