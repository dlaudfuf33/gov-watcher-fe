import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Globe, Twitter, Facebook, Youtube, Rss } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function PoliticianSocialMedia() {
  // 더미 데이터 - 실제로는 API에서 가져올 수 있음
  const socialMedia = {
    twitter: "https://twitter.com/politician",
    facebook: "https://facebook.com/politician",
    youtube: "https://youtube.com/politician",
    blog: "https://blog.naver.com/politician",
    website: "https://politician-website.com",
  }

  return (
    <Card className="border-gray-200">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <Globe className="h-5 w-5 mr-2 text-blue-500" />🌐 SNS
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between border-b border-gray-100 py-2">
            <div className="flex items-center">
              <Twitter className="h-4 w-4 mr-2 text-blue-400" />
              <span>트위터</span>
            </div>
            <Button variant="outline" size="sm" className="h-7 text-xs">
              바로가기
            </Button>
          </div>
          <div className="flex items-center justify-between border-b border-gray-100 py-2">
            <div className="flex items-center">
              <Facebook className="h-4 w-4 mr-2 text-blue-600" />
              <span>페이스북</span>
            </div>
            <Button variant="outline" size="sm" className="h-7 text-xs">
              바로가기
            </Button>
          </div>
          <div className="flex items-center justify-between border-b border-gray-100 py-2">
            <div className="flex items-center">
              <Youtube className="h-4 w-4 mr-2 text-red-600" />
              <span>유튜브</span>
            </div>
            <Button variant="outline" size="sm" className="h-7 text-xs">
              바로가기
            </Button>
          </div>
          <div className="flex items-center justify-between border-b border-gray-100 py-2">
            <div className="flex items-center">
              <Rss className="h-4 w-4 mr-2 text-green-600" />
              <span>블로그</span>
            </div>
            <Button variant="outline" size="sm" className="h-7 text-xs">
              바로가기
            </Button>
          </div>
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center">
              <Globe className="h-4 w-4 mr-2 text-purple-600" />
              <span>홈페이지</span>
            </div>
            <Button variant="outline" size="sm" className="h-7 text-xs">
              바로가기
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
