'use client';

import { useState } from 'react';
import { Film, Music, Trophy } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import KathaVintaava from '@/components/KathaVintaava';
import Saregamapa from '@/components/Saregamapa';
import Header from '@/components/Header';

export default function Home() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center py-12 slide-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Test Your Telugu Cinema Knowledge
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Challenge yourself with movie clues and song clips from Tollywood's finest
          </p>

          {/* Game Stats Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-12 max-w-2xl mx-auto">
            <Card className="border-2 hover:border-primary transition-colors">
              <CardContent className="p-6 text-center">
                <Film className="mx-auto text-primary mb-3" size={40} />
                <h3 className="text-xl font-bold mb-2">Movie Quiz</h3>
                <p className="text-sm text-muted-foreground">Guess Telugu movies from clues</p>
              </CardContent>
            </Card>
            <Card className="border-2 hover:border-secondary transition-colors">
              <CardContent className="p-6 text-center">
                <Music className="mx-auto text-secondary mb-3" size={40} />
                <h3 className="text-xl font-bold mb-2">Song Quiz</h3>
                <p className="text-sm text-muted-foreground">Identify songs from audio clips</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Game Tabs */}
        <Card className="shadow-2xl">
          <CardContent className="p-6">
            <Tabs defaultValue="katha-vintaava" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="katha-vintaava" className="flex items-center gap-2">
                  <Film size={20} />
                  <span className="font-semibold">Katha Vintaava</span>
                </TabsTrigger>
                <TabsTrigger value="saregamapa" className="flex items-center gap-2">
                  <Music size={20} />
                  <span className="font-semibold">Saregamapa</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="katha-vintaava" className="fade-in">
                <KathaVintaava />
              </TabsContent>
              <TabsContent value="saregamapa" className="fade-in">
                <Saregamapa />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center py-12">
          <div className="flex justify-center items-center mb-3">
            <Trophy className="text-yellow-500 mr-2" size={24} />
            <span className="font-semibold text-lg">Challenge Your Friends!</span>
          </div>
          <p className="text-muted-foreground text-sm">
            Share your scores and compete with fellow Telugu cinema enthusiasts
          </p>
        </div>
      </main>
    </>
  );
}
