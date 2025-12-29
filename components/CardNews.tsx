"use client";

import { useState, useEffect } from "react";
import { CardNews } from "@/types/card";
import { cardNewsData } from "@/data/cardNews";

export default function CardNewsComponent() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const currentCard = cardNewsData[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % cardNewsData.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + cardNewsData.length) % cardNewsData.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleNext();
    }
    if (isRightSwipe) {
      handlePrev();
    }
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentIndex]);

  // 날짜 포맷팅
  const getFormattedDate = () => {
    const today = new Date();
    const days = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
    const month = today.getMonth() + 1;
    const date = today.getDate();
    const day = days[today.getDay()];
    return `${month}월 ${date}일 ${day}`;
  };

  return (
    <div 
      className="min-h-screen bg-[#1a1a1a] text-white"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* 상단 헤더 */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-1">내 브리핑</h1>
            <p className="text-sm text-gray-400">{getFormattedDate()}</p>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-400">서울특별시</span>
            <div className="flex items-center gap-1">
              <span>1°C</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            </div>
            <span className="text-gray-500 text-xs">웨더뉴스</span>
          </div>
        </div>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 왼쪽: 주요 뉴스 */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">주요 뉴스</h2>
            </div>

            {/* 메인 카드뉴스 */}
            <div className="bg-[#252525] rounded-lg overflow-hidden border border-gray-800 hover:border-gray-700 transition-colors">
              <div className="relative h-64 md:h-80">
                <img
                  src={currentCard.image}
                  alt={currentCard.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600"%3E%3Crect fill="%23333" width="800" height="600"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%23999" font-size="24"%3E이미지%3C/text%3E%3C/svg%3E';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                
                {/* 카테고리 */}
                <div className="absolute top-4 left-4">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded text-xs font-semibold">
                    {currentCard.category}
                  </span>
                </div>

                {/* 날짜 */}
                <div className="absolute bottom-4 left-4">
                  <span className="text-white text-sm">{currentCard.date}</span>
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-gray-400">최신 뉴스</span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {currentIndex + 1} / {cardNewsData.length}
                  </span>
                </div>

                <h3 className="text-xl md:text-2xl font-bold mb-3 leading-tight">
                  {currentCard.title}
                </h3>

                <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-4">
                  {currentCard.content}
                </p>

                {/* 네비게이션 버튼 */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                  <button
                    onClick={handlePrev}
                    disabled={currentIndex === 0}
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    <span className="text-sm">이전</span>
                  </button>

                  <div className="flex gap-2">
                    {cardNewsData.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`transition-all ${
                          index === currentIndex
                            ? "w-8 h-1.5 bg-blue-500 rounded-full"
                            : "w-1.5 h-1.5 bg-gray-600 rounded-full hover:bg-gray-500"
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={handleNext}
                    disabled={currentIndex === cardNewsData.length - 1}
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <span className="text-sm">다음</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 오른쪽: 관련 뉴스 */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">관련 뉴스</h2>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
              </div>

              <div className="space-y-3">
                {cardNewsData
                  .filter((_, index) => index !== currentIndex)
                  .slice(0, 3)
                  .map((card, idx) => (
                    <div
                      key={card.id}
                      className="bg-[#252525] rounded-lg overflow-hidden border border-gray-800 hover:border-gray-700 transition-colors cursor-pointer"
                      onClick={() => setCurrentIndex(cardNewsData.findIndex(c => c.id === card.id))}
                    >
                      <div className="flex gap-3 p-3">
                        <div className="relative w-20 h-20 flex-shrink-0 rounded overflow-hidden">
                          <img
                            src={card.image}
                            alt={card.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23333" width="200" height="200"/%3E%3C/svg%3E';
                            }}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs text-gray-500 mb-1">{card.category}</div>
                          <h4 className="text-sm font-semibold line-clamp-2 mb-1 leading-snug">
                            {card.title}
                          </h4>
                          <div className="text-xs text-gray-500">{card.date}</div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* 추천 섹션 */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">추천</h2>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>

              <div className="space-y-3">
                {cardNewsData.slice(0, 3).map((card) => (
                  <div
                    key={card.id}
                    className="bg-[#252525] rounded-lg overflow-hidden border border-gray-800 hover:border-gray-700 transition-colors cursor-pointer"
                    onClick={() => setCurrentIndex(cardNewsData.findIndex(c => c.id === card.id))}
                  >
                    <div className="flex gap-3 p-3">
                      <div className="relative w-20 h-20 flex-shrink-0 rounded overflow-hidden">
                        <img
                          src={card.image}
                          alt={card.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23333" width="200" height="200"/%3E%3C/svg%3E';
                          }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs text-gray-500 mb-1">{card.category}</div>
                        <h4 className="text-sm font-semibold line-clamp-2 mb-1 leading-snug">
                          {card.title}
                        </h4>
                        <div className="text-xs text-gray-500">{card.date}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
