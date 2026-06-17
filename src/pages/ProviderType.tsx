import { useNavigate } from "react-router-dom";

const ProviderType = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* NAV */}
      <nav className="border-b border-border bg-background">
        <div className="flex items-center justify-between px-5 md:px-10 h-14">
          <button
            onClick={() => navigate("/get-started")}
            className="flex items-center gap-1.5 text-[13px] text-muted-foreground hover:text-brand transition-colors"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Back
          </button>
          <div className="font-display text-[19px] font-bold text-ink tracking-wide">
            Xito<span className="text-brand">.</span>Events
          </div>
          <div className="w-12" />
        </div>
      </nav>

      {/* CONTENT */}
      <div className="flex-1 flex flex-col items-center px-5 pt-6 pb-10">

        {/* Step indicator */}
        <div className="flex items-center gap-2 mb-6">
          <div className="flex items-center gap-1.5">
            <span className="w-5 h-5 rounded-full bg-brand text-white text-[10px] font-bold flex items-center justify-center">1</span>
            <span className="text-[11px] text-brand font-medium">Account type</span>
          </div>
          <div className="w-6 h-px bg-border" />
          <div className="flex items-center gap-1.5">
            <span className="w-5 h-5 rounded-full bg-muted text-muted-foreground text-[10px] font-bold flex items-center justify-center">2</span>
            <span className="text-[11px] text-muted-foreground">Your details</span>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-6 max-w-xs mx-auto">
          <p className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-2">Service Provider</p>
          <h1 className="font-display text-[24px] md:text-[30px] font-bold text-ink leading-tight">
            How do you <span className="text-brand">work</span>?
          </h1>
          <p className="text-[13px] text-muted-foreground mt-2">
            This helps us set up the right profile for you.
          </p>
        </div>

        {/* Cards */}
        <div className="flex flex-col md:flex-row gap-3 w-full max-w-xl">
          {/* Agency */}
          <button
            onClick={() => navigate("/register?type=agency")}
            className="group flex-1 rounded-2xl border-2 border-border hover:border-brand bg-white hover:bg-brand/[0.03] transition-all p-5 md:p-7 text-left shadow-sm hover:shadow-md active:scale-[0.98]"
          >
            <div className="w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center text-xl mb-4">
              🏢
            </div>
            <h2 className="font-display text-[16px] md:text-[17px] font-semibold text-ink mb-1 group-hover:text-brand transition-colors">
              I'm an Agency
            </h2>
            <p className="text-[12px] text-muted-foreground leading-relaxed mb-4">
              A registered business or studio with a team of professionals offering event services.
            </p>
            <div className="flex items-center gap-1 text-brand text-[12px] font-semibold">
              Continue as Agency
              <svg className="group-hover:translate-x-1 transition-transform" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </button>

          {/* Freelancer */}
          <button
            onClick={() => navigate("/register?type=freelancer")}
            className="group flex-1 rounded-2xl border-2 border-border hover:border-brand bg-white hover:bg-brand/[0.03] transition-all p-5 md:p-7 text-left shadow-sm hover:shadow-md active:scale-[0.98]"
          >
            <div className="w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center text-xl mb-4">
              🧑‍💻
            </div>
            <h2 className="font-display text-[16px] md:text-[17px] font-semibold text-ink mb-1 group-hover:text-brand transition-colors">
              I'm a Freelancer
            </h2>
            <p className="text-[12px] text-muted-foreground leading-relaxed mb-4">
              An independent professional offering your own skills and services for events.
            </p>
            <div className="flex items-center gap-1 text-brand text-[12px] font-semibold">
              Continue as Freelancer
              <svg className="group-hover:translate-x-1 transition-transform" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProviderType;
