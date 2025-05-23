export default function CtaSection() {
  return (
    <>
      <main className="py-2 bg-gradient-to-r from-blue-600/90 to-red-600/90 backdrop-blur-sm">
        <section className="container mx-auto px-4">
          <section
            className="bg-gradient-to-br from-white/10 to-white/5 shadow-[0_8px_30px_rgba(255,255,255,0.2)] rounded-2xl 
          p-6 max-w-4xl mx-auto text-white text-center border border-white/30"
          >
            <h2 className="text-3xl font-bold mb-4">
              국민의 관심이 필요합니다
            </h2>
            <p className="mb-6 max-w-2xl mx-auto text-white/90">
              여러분의 관심이 대한민국의 미래를 만듭니다. 법안에 대한 의견을
              남기고 더 나은 사회를 함께 만들어가요.
            </p>
          </section>
        </section>
      </main>
    </>
  );
}
