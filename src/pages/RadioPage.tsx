import { useState, useEffect } from "react";
import { RadioPlayer } from "@/components/RadioPlayer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "@phosphor-icons/react";
import { getSchedule, type Show } from "@/lib/radio";

interface RadioPageProps {
  onNavigate: (route: string) => void;
}

export function RadioPage({ onNavigate }: RadioPageProps) {
  const [schedule, setSchedule] = useState<Show[]>([]);

  useEffect(() => {
    setSchedule(getSchedule());
  }, []);

  const groupByDay = (shows: Show[]) => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const grouped: Record<string, Show[]> = {};

    shows.forEach((show) => {
      const day = days[show.dayOfWeek];
      if (!grouped[day]) grouped[day] = [];
      grouped[day].push(show);
    });

    return grouped;
  };

  const groupedSchedule = groupByDay(schedule);

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button
            onClick={() => onNavigate("home")}
            variant="ghost"
            size="icon"
          >
            <ArrowLeft size={24} />
          </Button>
          <h1 className="text-2xl font-bold tracking-wider">HOTMESS RADIO</h1>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12 space-y-12">
        <section>
          <h2 className="text-4xl font-bold mb-8">NOW PLAYING</h2>
          <RadioPlayer />
        </section>

        <section>
          <h2 className="text-4xl font-bold mb-8">SCHEDULE</h2>
          <div className="space-y-8">
            {Object.entries(groupedSchedule).map(([day, shows]) => (
              <div key={day}>
                <h3 className="text-2xl font-bold mb-4 text-accent">{day}</h3>
                <div className="grid gap-4">
                  {shows.map((show) => (
                    <Card
                      key={show.id}
                      className={`p-6 border-2 ${show.isLive ? "border-accent" : "border-border"}`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="text-xl font-bold">{show.title}</h4>
                            {show.isLive && (
                              <Badge className="bg-accent text-accent-foreground animate-pulse">
                                LIVE NOW
                              </Badge>
                            )}
                          </div>
                          <p className="text-muted-foreground mb-2">
                            Hosted by{" "}
                            <span className="text-foreground font-medium">
                              {show.host}
                            </span>
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {show.description}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-mono text-muted-foreground">
                            {show.startTime} - {show.endTime}
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-card border-2 border-border p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">RAW CONVICT RECORDS</h3>
          <p className="text-muted-foreground mb-6">
            Our independent music label featuring underground artists
            <br />
            from around the world.
          </p>
          <Button variant="outline" className="border-2">
            EXPLORE LABEL
          </Button>
        </section>
      </div>
    </div>
  );
}
