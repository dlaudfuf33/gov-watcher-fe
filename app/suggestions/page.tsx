"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SuggestionFAQ from "@/components/suggestions/SuggestionFAQ";
import SuggestionForm from "@/components/suggestions/SuggestionForm";
import SuggestionList from "@/components/suggestions/SuggestionList";

export default function SuggestionsPage() {
  const [activeTab, setActiveTab] = useState("submit");

  return (
    <section className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-blue-50">
      <header>
        <Header />
      </header>
      <main className="flex-1 container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              건의사항
            </h1>
            <p className="text-gray-600">
              정부야모하니 서비스 개선을 위한 의견을 남겨주세요. 여러분의 소중한
              의견이 더 나은 서비스를 만듭니다.
            </p>
          </div>

          <Tabs
            defaultValue="submit"
            value={activeTab}
            onValueChange={setActiveTab}
            className="mb-8"
          >
            <TabsList className="grid grid-cols-3 mb-8 bg-gray-100 p-1 rounded-lg">
              <TabsTrigger
                value="submit"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white rounded-md transition-all duration-300"
              >
                건의하기
              </TabsTrigger>
              <TabsTrigger
                value="list"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white rounded-md transition-all duration-300"
              >
                건의 목록
              </TabsTrigger>
              <TabsTrigger
                value="faq"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white rounded-md transition-all duration-300"
              >
                자주 묻는 질문
              </TabsTrigger>
            </TabsList>

            <TabsContent value="submit">
              <div className="bg-white rounded-xl shadow-md p-6">
                <SuggestionForm onSuccess={() => setActiveTab("list")} />
              </div>
            </TabsContent>

            <TabsContent value="list">
              <div className="bg-white rounded-xl shadow-md p-6">
                <SuggestionList />
              </div>
            </TabsContent>

            <TabsContent value="faq">
              <div className="bg-white rounded-xl shadow-md p-6">
                <SuggestionFAQ />
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>
      <footer>
        <Footer />
      </footer>
    </section>
  );
}
