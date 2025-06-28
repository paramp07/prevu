import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, Settings } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="max-w-md mx-auto">
        {/* Logo */}
        <div className="w-full flex justify-center">
          <div className="flex justify-center mb-2 w-40">
            <svg viewBox="0 0 142 42" xmlns="http://www.w3.org/2000/svg" data-logo="logo">
              <g transform="translate(0, 1) rotate(0)" id="logogram" style={{ opacity: 1 }}><path fill="#CD3850" d="M33.724 36.5809C37.7426 32.5622 40.0003 27.1118 40.0003 21.4286C40.0003 15.7454 37.7426 10.2949 33.724 6.27629C29.7054 2.25765 24.2549 1.02188e-06 18.5717 0C12.8885 -1.02188e-06 7.43807 2.25764 3.41943 6.27628L10.4905 13.3473C11.6063 14.4631 13.4081 14.4074 14.8276 13.7181C15.9836 13.1568 17.2622 12.8571 18.5717 12.8571C20.845 12.8571 23.0252 13.7602 24.6326 15.3677C26.2401 16.9751 27.1431 19.1553 27.1431 21.4286C27.1431 22.7381 26.8435 24.0167 26.2822 25.1727C25.5929 26.5922 25.5372 28.394 26.6529 29.5098L33.724 36.5809Z"></path><path fill="#81323F" d="M30 40H19.5098C17.9943 40 16.5408 39.398 15.4692 38.3263L1.67368 24.5308C0.60204 23.4592 0 22.0057 0 20.4902V10L30 40Z"></path><path fill="#533237" d="M10.7143 39.9999H4.28571C1.91878 39.9999 0 38.0812 0 35.7142V29.2856L10.7143 39.9999Z"></path></g>
              <g transform="translate(46, 8)" id="logotype" style={{ opacity: 1 }}><path d="M13.52 26L8.31 26L8.31 0.54L18.24 0.54Q21.14 0.54 23.18 1.64Q25.21 2.74 26.28 4.68Q27.35 6.62 27.35 9.13L27.35 9.13Q27.35 11.66 26.26 13.58Q25.17 15.51 23.12 16.59Q21.06 17.68 18.12 17.68L18.12 17.68L11.73 17.68L11.73 13.47L17.28 13.47Q18.89 13.47 19.92 12.92Q20.95 12.36 21.46 11.39Q21.96 10.41 21.96 9.13L21.96 9.13Q21.96 7.85 21.46 6.88Q20.95 5.90 19.91 5.37Q18.87 4.84 17.26 4.84L17.26 4.84L13.52 4.84L13.52 26ZM33.72 26L28.59 26L28.59 6.89L33.55 6.89L33.55 10.23L33.75 10.23Q34.28 8.45 35.52 7.54Q36.76 6.64 38.37 6.64L38.37 6.64Q38.76 6.64 39.21 6.68Q39.66 6.72 40.02 6.81L40.02 6.81L40.02 11.39Q39.68 11.27 39.03 11.20Q38.38 11.13 37.80 11.13L37.80 11.13Q36.64 11.13 35.70 11.64Q34.76 12.14 34.24 13.04Q33.72 13.93 33.72 15.13L33.72 15.13L33.72 26ZM49.20 26.38L49.20 26.38Q46.28 26.38 44.16 25.18Q42.04 23.98 40.90 21.78Q39.77 19.57 39.77 16.55L39.77 16.55Q39.77 13.59 40.89 11.37Q42.02 9.15 44.09 7.90Q46.16 6.65 48.94 6.65L48.94 6.65Q50.82 6.65 52.45 7.25Q54.07 7.85 55.30 9.06Q56.53 10.26 57.22 12.07Q57.91 13.88 57.91 16.34L57.91 16.34L57.91 17.78L41.87 17.78L41.87 14.57L55.40 14.57L53.01 15.42Q53.01 13.93 52.56 12.83Q52.10 11.73 51.21 11.12Q50.31 10.52 48.98 10.52L48.98 10.52Q47.66 10.52 46.73 11.13Q45.80 11.75 45.32 12.80Q44.84 13.85 44.84 15.20L44.84 15.20L44.84 17.47Q44.84 19.13 45.40 20.26Q45.95 21.39 46.95 21.95Q47.95 22.51 49.28 22.51L49.28 22.51Q50.19 22.51 50.93 22.26Q51.66 22.00 52.18 21.50Q52.70 20.99 52.98 20.26L52.98 20.26L57.62 21.13Q57.16 22.70 56.02 23.89Q54.87 25.08 53.16 25.73Q51.44 26.38 49.20 26.38ZM70.35 26L64.53 26L57.49 6.89L62.94 6.89L66.15 16.81Q66.73 18.67 67.17 20.57Q67.60 22.46 68.06 24.50L68.06 24.50L66.97 24.50Q67.41 22.46 67.84 20.57Q68.27 18.67 68.85 16.81L68.85 16.81L72.03 6.89L77.41 6.89L70.35 26ZM84.43 26.24L84.43 26.24Q82.45 26.24 80.96 25.38Q79.48 24.51 78.67 22.90Q77.85 21.28 77.85 19.04L77.85 19.04L77.85 6.89L82.98 6.89L82.98 18.16Q82.98 19.93 83.90 20.94Q84.83 21.95 86.43 21.95L86.43 21.95Q87.53 21.95 88.36 21.48Q89.20 21.01 89.67 20.11Q90.14 19.22 90.14 17.95L90.14 17.95L90.14 6.89L95.27 6.89L95.27 26L90.43 26L90.36 21.23L90.65 21.23Q89.90 23.64 88.36 24.94Q86.81 26.24 84.43 26.24Z" fill="#3c2d30"></path></g>
            </svg>
          </div>
        </div>
        
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <p className="text-muted-foreground">Instantly visualize any restaurant menu</p>
        </div>

        {/* Main Action Card */}
        <Card className="mb-8 shadow-lg bg-card text-card-foreground">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-foreground">Ready to Scan?</CardTitle>
            <CardDescription>
              Take photos or upload images of any menu to see dishes come to life
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link href="/camera" className="w-full">
              <Button size="lg" className="w-full bg-primary hover:bg-primary text-primary-foreground">
                <Camera className="mr-2 h-5 w-5" />
                Scan Menu
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="space-y-3">
          <Link href="/settings" className="w-full">
            <Button variant="outline" className="w-full">
              <Settings className="mr-2 h-4 w-4" />
              Settings & Preferences
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
