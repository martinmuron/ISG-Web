import { useTranslations, useLocale } from "next-intl";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Property } from "@/lib/validations";

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const t = useTranslations("properties");
  const locale = useLocale();

  const getLocalizedTitle = () => {
    if (locale === "en") {
      const translations = {
        "Prodej bytu 2+kk 44 m², Jana Želivského, Praha": "2+kk Apartment 44 m², Jana Želivského, Prague",
        "Prodej bytu 1+kk 34 m², Jana Želivského, Praha": "1+kk Apartment 34 m², Jana Želivského, Prague",
        "Prodej bytu 1+kk 30 m², Jana Želivského, Praha": "1+kk Apartment 30 m², Jana Želivského, Prague",
        "Prodej bytu 2+1 49 m², Seifertova, Praha - Žižkov": "2+1 Apartment 49 m², Seifertova, Prague - Žižkov",
        "Prodej rodinného domu 168 m², pozemek 281 m², Na Jarově, Praha - Žižkov": "Family House 168 m², Plot 281 m², Na Jarově, Prague - Žižkov"
      };
      return translations[property.title as keyof typeof translations] || property.title;
    }
    return property.title;
  };

  const getLocalizedSubtitle = () => {
    if (locale === "en") {
      const translations = {
        "Nově nabízíme k prodeji krásný a praktický byt v osobním vlastnictví 2+kk o celkovém rozměru 44 m², který se nachází v 1. patře v jedné z nejžádanějších lokalit Prahy – Jana Želivského.": "Newly offered for sale is a beautiful and practical 2+kk apartment with a total size of 44 m², located on the 1st floor in one of Prague's most sought-after locations – Jana Želivského.",
        "Prodej bytu 1+kk, 30 m², ve 2. patře domu s výtahem, v Praze 3 – Žižkov.": "Sale of a 1+kk apartment, 30 m², on the 2nd floor of a building with an elevator, in Prague 3 – Žižkov.",
        "Tato část města prochází velkou proměnou a stává se jednou z nejžádanějších a nejvíc trendy čtvrtí v Praze, podobně jako sousední Karlín. Ceny nových bytů na Žižkově nyní rostou nejvíce v celé metropoli.": "This part of the city is undergoing a major transformation and is becoming one of the most sought-after and trendy neighborhoods in Prague, similar to neighboring Karlín. Prices of new apartments in Žižkov are now rising the most in the entire metropolis.",
        "Byt 2+1 49 m² k prodeji Seifertova, Praha - Žižkov; sklep, výtah, patrový, osobní vlastnictví, ve velmi dobrém stavu.": "2+1 apartment 49 m² for sale Seifertova, Prague - Žižkov; basement, elevator, multi-story, personal ownership, in very good condition.",
        "GLJ Partners nabízí k prodeji rodinný dům v klidné rezidenční části Prahy 3 Žižkov, v ulici Na Jarově. Nemovitost je ideální volbou pro dvougenerační bydlení nebo investici. V současné době je v řízení stavební projekt na rozšíření obytné plochy domu.": "GLJ Partners offers for sale a family house in the quiet residential part of Prague 3 Žižkov, on Na Jarově street. The property is an ideal choice for two-generation living or investment. A construction project to expand the living area of the house is currently underway."
      };
      return translations[property.subtitle as keyof typeof translations] || property.subtitle;
    }
    return property.subtitle;
  };

  const getLocalizedPrice = () => {
    if (locale === "en" && property.price === "Informace o ceně na vyžádání") {
      return t("priceOnRequest");
    }
    return property.price;
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 h-full flex flex-col">
      <CardHeader className="space-y-4">
        <div className="space-y-2">
          <div className="flex gap-2 flex-wrap">
            <Badge variant="secondary" className="text-xs">
              {property.bedrooms}
            </Badge>
            <Badge variant="secondary" className="text-xs">
              {property.size}
            </Badge>
            <Badge variant="secondary" className="text-xs">
              {property.propertyType === "apartment" ? locale === "en" ? "Apartment" : "Byt" : locale === "en" ? "House" : "Dům"}
            </Badge>
          </div>
          
          <h3 className="font-semibold text-lg leading-tight line-clamp-2">
            {getLocalizedTitle()}
          </h3>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 flex-1 flex flex-col">
        <p className="text-sm text-slate-600 line-clamp-3">
          {getLocalizedSubtitle()}
        </p>
        
        <div className="space-y-2 mt-auto">
          <p className="text-sm text-slate-500">{property.location}</p>
          <p className="text-xl font-bold text-slate-900">
            {getLocalizedPrice()}
          </p>
        </div>
      </CardContent>

      <CardFooter>
        <Button 
          asChild 
          className="w-full bg-brand hover:bg-brand-700 transition-colors"
        >
          <a 
            href={property.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2"
          >
            {t("viewDetails")}
            <span className="text-xs">↗</span>
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}