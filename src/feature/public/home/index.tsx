import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Code, Cpu, ShieldCheck } from 'lucide-react';

export const HomePage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16 space-y-24">
      {/* Hero Section */}
      <section className="text-center space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <Badge variant="secondary" className="mb-4 text-sm px-4 py-1">
          Вступальна кампанія 2026
        </Badge>
        <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 sm:text-6xl">
          Ласкаво просимо до <br className="hidden sm:block" />
          <span className="text-primary">ВСП «ФКЗІ ДУІТЗ»</span>
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          Фаховий коледж зв'язку та інформатизації. Твій старт у світ сучасних технологій, розробки
          та кіберзахисту.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-8">
          <Button size="lg" className="gap-2 w-full sm:w-auto">
            Подати заяву <ArrowRight className="w-4 h-4" />
          </Button>
          <Button size="lg" variant="outline" className="w-full sm:w-auto">
            Навчальні програми
          </Button>
        </div>
      </section>

      {/* Specialties Section */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            Популярні напрями
          </h2>
          <p className="text-slate-600 mt-2">Обери спеціальність, яка підходить саме тобі</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <ShieldCheck className="w-10 h-10 text-primary mb-4" />
              <CardTitle>Безпека комп'ютерних систем і мереж</CardTitle>
              <CardDescription>Захист інформації та кібербезпека</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600">
                Вивчення криптографії, захист від вразливостей, налаштування захищених каналів зв'язку та
                адміністрування мереж.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <Code className="w-10 h-10 text-primary mb-4" />
              <CardTitle>Інженерія програмного забезпечення</CardTitle>
              <CardDescription>Розробка сучасних застосунків</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600">
                Створення web- та мобільних застосунків з використанням React, TypeScript, Next.js та
                інших передових технологій.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <Cpu className="w-10 h-10 text-primary mb-4" />
              <CardTitle>Комп'ютерна інженерія</CardTitle>
              <CardDescription>Апаратне забезпечення та архітектура</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600">
                Проєктування мікропроцесорних систем, обслуговування комп'ютерної техніки та
                IoT-пристроїв.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};
