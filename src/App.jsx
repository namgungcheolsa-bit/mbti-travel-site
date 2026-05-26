import React, { useState } from 'react';
import { questions } from './questions';
import { results } from './results';

function App() {
  // gameState: 'START' (랜딩), 'QUIZ' (테스트), 'RESULT' (결과)
  const [gameState, setGameState] = useState('START');
  const [currentStep, setCurrentStep] = useState(0); 
  const [scores, setScores] = useState({
    leader: 0,
    risk: 0,
    mover: 0,
    striker: 0,
    helper: 0,
    genius: 0
  }); 
  const [finalType, setFinalType] = useState("leader");

  // 테스트 시작 핸들러
  const startTest = () => {
    setGameState('QUIZ');
    setCurrentStep(0);
    setScores({ leader: 0, risk: 0, mover: 0, striker: 0, helper: 0, genius: 0 });
  };

  // 답변 클릭 핸들러
  const handleAnswerClick = (value) => {
    const nextScores = { ...scores, [value]: scores[value] + 1 };
    setScores(nextScores);

    if (currentStep + 1 < questions.length) {
      setCurrentStep(currentStep + 1);
    } else {
      calculateResult(nextScores);
    }
  };

  // 결과 계산 알고리즘
  const calculateResult = (finalScores) => {
    let maxScore = -1;
    let winnerType = "leader";

    for (const type in finalScores) {
      if (finalScores[type] > maxScore) {
        maxScore = finalScores[type];
        winnerType = type;
      }
    }
    
    setFinalType(winnerType);
    setGameState('RESULT');
  };

  // 다시 하기 핸들러
  const resetTest = () => {
    setGameState('START');
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4 font-sans text-gray-100 selection:bg-amber-500 selection:text-slate-900">
      <div className="max-w-md w-full bg-slate-800 rounded-2xl shadow-2xl p-6 border border-slate-700 transition-all duration-300">
        
        {/* 1. 시작하기 랜딩 페이지 */}
        {gameState === 'START' && (
          <div className="text-center py-4 flex flex-col items-center">
            <div className="mb-2 text-xs font-black tracking-widest text-amber-500 uppercase border border-amber-500/30 px-3 py-1 rounded">
              1950 감우재 전장 시뮬레이션
            </div>
            
            <h1 className="text-3xl font-black tracking-tight text-white mt-4 mb-3 break-keep leading-tight">
              나와 닮은 <br />
              <span className="text-amber-400">감우재 전투의 영웅</span>은?
            </h1>
            
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm mb-8 break-keep">
              6.25 전쟁 발발 초기, 국군 최초의 대승을 거둔 음성 감우재 전투. <br />
              위기의 순간 당신의 선택을 통해, 당신 안에 숨겨진 영웅적 면모와 최적의 음성 로컬 여행지를 매칭해 드립니다.
            </p>

            {/* 디자인 포인트: 전장 그래픽적 요소를 대신할 아이콘 영역 */}
            <div className="w-24 h-24 rounded-full bg-slate-700/50 border border-slate-600 flex items-center justify-center mb-8 shadow-inner text-3xl animate-pulse">
              🎖️
            </div>

            <button
              onClick={startTest}
              className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-black py-4 px-6 rounded-xl transition duration-200 shadow-lg text-base tracking-wide uppercase active:scale-[0.99]"
            >
              작전 구역 진입하기
            </button>
            
            <span className="text-[10px] text-slate-500 mt-4 block">
              소요 시간: 약 3분 · 총 12문항
            </span>
          </div>
        )}

        {/* 2. 테스트 진행 화면 */}
        {gameState === 'QUIZ' && (
          <div>
            {/* 상단 프로그레스 헤더 */}
            <div className="flex justify-between items-center mb-4 text-xs font-bold text-amber-400">
              <span>감우재 작전 구역 진입률</span>
              <span>{currentStep + 1} / {questions.length}</span>
            </div>
            <div className="w-full bg-slate-700 h-2 rounded-full mb-6 overflow-hidden">
              <div 
                className="bg-amber-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
            
            {/* 질문 출력 카드 */}
            <div className="bg-slate-800 border-l-4 border-amber-500 p-4 mb-6 rounded-r-xl">
              <h2 className="text-lg font-bold text-slate-100 leading-snug break-keep">
                Q{questions[currentStep].id}. {questions[currentStep].title}
              </h2>
            </div>
            
            {/* 답변 리스트 */}
            <div className="space-y-3">
              {questions[currentStep].answers.map((answer, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerClick(answer.value)}
                  className="w-full text-left p-4 rounded-xl border border-slate-700 bg-slate-700/50 hover:border-amber-500 hover:bg-amber-500/10 text-slate-300 hover:text-amber-400 font-medium transition duration-200 active:scale-[0.98] break-keep"
                >
                  {answer.text}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 3. 결과 출력 화면 */}
        {gameState === 'RESULT' && (
          <div className="text-center">
            <span className="text-xs font-black text-slate-900 tracking-wider uppercase bg-amber-400 px-3 py-1 rounded-full">전장 매칭 결과</span>
            
            <h2 className="text-2xl font-black text-white mt-4 mb-4 break-keep">
              {results[finalType]?.historicalFigure}
            </h2>

            {/* 인물 이미지 영역 */}
            {results[finalType]?.image && (
              <div className="w-full h-52 rounded-xl overflow-hidden mb-4 border-2 border-slate-700 shadow-md">
                <img 
                  src={results[finalType].image} 
                  alt={results[finalType].historicalFigure} 
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            <p className="text-slate-300 leading-relaxed mb-6 bg-slate-900/50 p-4 rounded-xl text-sm text-left border border-slate-700/50 break-keep">
              {results[finalType]?.description}
            </p>
            
            <hr className="my-6 border-slate-700" />
            
            <h3 className="font-bold text-amber-400 mb-3 text-left">
              📍 추천 작전지 (음성군 로컬 여행지)
            </h3>
            <div className="space-y-3 text-left mb-6">
              {results[finalType]?.travelDestinations.map((dest, idx) => (
                <div key={idx} className="p-3 bg-slate-900/40 rounded-lg border border-slate-700">
                  <h4 className="font-bold text-white text-sm">{dest.name}</h4>
                  <p className="text-xs text-slate-400 mt-1 break-keep">{dest.desc}</p>
                </div>
              ))}
            </div>
            
            <button
              onClick={resetTest}
              className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-black py-3.5 px-4 rounded-xl transition duration-200 shadow-lg"
            >
              처음으로 돌아가기
            </button>
          </div>
        )}
        
      </div>
    </div>
  );
}

export default App;