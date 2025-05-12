"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlertCircle, CheckCircle2, Upload } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { suggestionApi } from "@/api/suggestion";
import { toast } from "react-toastify";

interface SuggestionFormProps {
  onSuccess?: () => void;
}

export default function SuggestionForm({ onSuccess }: SuggestionFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState("feature");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!type || !category) {
      toast.error("유형과 카테고리를 모두 선택해주세요.");
      setIsSubmitting(false);
      return;
    }

    try {
      await suggestionApi.submitSuggestion({
        name: isAnonymous ? null : name,
        email: isAnonymous ? null : email,
        type,
        category,
        content,
        isAnonymous,
      });

      setIsSuccess(true);
      setTimeout(() => {
        resetForm();
        if (onSuccess) onSuccess();
      }, 2000);
    } catch (err) {
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setType("feature");
    setCategory("");
    setContent("");
    setIsAnonymous(false);
    setFile(null);
    setIsSuccess(false);
  };

  return (
    <div>
      <AnimatePresence>
        {isSuccess ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-8"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">
              건의사항이 성공적으로 제출되었습니다
            </h3>
            <p className="text-gray-600 mb-6">
              소중한 의견 감사합니다. 더 나은 서비스를 위해 노력하겠습니다.
            </p>
            <Button onClick={resetForm}>새 건의사항 작성하기</Button>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">
                    이름{" "}
                    {!isAnonymous && <span className="text-red-500">*</span>}
                  </Label>
                  <Input
                    id="name"
                    placeholder="이름을 입력하세요"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required={!isAnonymous}
                    disabled={isAnonymous}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">
                    이메일{" "}
                    {!isAnonymous && <span className="text-red-500">*</span>}
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="이메일을 입력하세요"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required={!isAnonymous}
                    disabled={isAnonymous}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="anonymous"
                  aria-label="건의사항"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <Label htmlFor="anonymous" className="text-sm font-normal">
                  익명으로 제출하기
                </Label>
              </div>

              <div className="space-y-2">
                <Label>
                  건의사항 유형 <span className="text-red-500">*</span>
                </Label>
                <RadioGroup
                  value={type}
                  onValueChange={setType}
                  className="flex flex-wrap gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="feature" id="feature" />
                    <Label htmlFor="feature" className="font-normal">
                      기능 요청
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="bug" id="bug" />
                    <Label htmlFor="bug" className="font-normal">
                      버그 신고
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="improvement" id="improvement" />
                    <Label htmlFor="improvement" className="font-normal">
                      개선 제안
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="other" />
                    <Label htmlFor="other" className="font-normal">
                      기타
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">
                  카테고리 <span className="text-red-500">*</span>
                </Label>
                <Select value={category} onValueChange={setCategory} required>
                  <SelectTrigger>
                    <SelectValue placeholder="카테고리를 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ui">UI/UX</SelectItem>
                    <SelectItem value="performance">성능</SelectItem>
                    <SelectItem value="data">데이터 정확성</SelectItem>
                    <SelectItem value="accessibility">접근성</SelectItem>
                    <SelectItem value="content">콘텐츠</SelectItem>
                    <SelectItem value="other">기타</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">
                  건의사항 내용 <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="content"
                  placeholder="건의사항 내용을 자세히 입력해주세요"
                  rows={6}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100">
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-spin mr-2">⏳</span> 제출 중...
                  </>
                ) : (
                  "건의사항 제출하기"
                )}
              </Button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
