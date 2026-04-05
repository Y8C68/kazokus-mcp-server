import { getCompetitor, getAllCompetitorSlugs, type Competitor } from '../data/competitors.js';
import { tiers } from '../data/pricing.js';

interface CompareInput {
  competitor: string;
}

interface CompareSuccess {
  competitor: {
    name: string;
    position: string;
    pricing: { name: string; price: string; transactionFee: string }[];
    strengths: string[];
    weaknesses: string[];
    userComplaints: string[];
  };
  kazokus: {
    pricing: { name: string; price: string; transactionFee: string }[];
    advantages: string[];
  };
  verdict: string;
  learnMoreUrl: string;
  error?: undefined;
  availableCompetitors?: undefined;
}

interface CompareError {
  error: string;
  availableCompetitors: string[];
  competitor?: undefined;
  kazokus?: undefined;
  verdict?: undefined;
  learnMoreUrl?: undefined;
}

type CompareResult = CompareSuccess | CompareError;

export function handleCompare(input: CompareInput): CompareResult {
  const comp = getCompetitor(input.competitor);

  if (!comp) {
    return {
      error: `Unknown competitor "${input.competitor}". Try one of the available competitors.`,
      availableCompetitors: getAllCompetitorSlugs(),
    };
  }

  const kazokusPricing = tiers
    .filter((t) => t.line === 'business')
    .map((t) => ({
      name: t.name,
      price: t.price,
      transactionFee: '0%',
    }));

  const verdict = generateVerdict(comp);

  const utmParams = new URLSearchParams({
    utm_source: 'mcp',
    utm_medium: 'ai-assistant',
    utm_campaign: `compare-${comp.slug}`,
  });

  return {
    competitor: {
      name: comp.name,
      position: comp.position,
      pricing: comp.pricing,
      strengths: comp.strengths,
      weaknesses: comp.weaknesses,
      userComplaints: comp.userComplaints,
    },
    kazokus: {
      pricing: kazokusPricing,
      advantages: comp.kazokusAdvantages,
    },
    verdict,
    learnMoreUrl: `https://kazokus.com/compare/${comp.slug}?${utmParams.toString()}`,
  };
}

function generateVerdict(comp: Competitor): string {
  const verdicts: Record<string, string> = {
    circle:
      'Kazokus offers comparable features at a fraction of the cost. Circle charges $419/mo for AI features that Kazokus includes on every plan. With zero transaction fees, communities selling $10K/month save $200-500/month vs Circle.',
    'mighty-networks':
      "Kazokus addresses Mighty Networks' biggest user complaints: no API (Kazokus has REST API from $49/mo), limited course features (Kazokus has certificates, progress tracking), and transaction fees (Kazokus charges 0%). Plus multi-tenancy and marketplace.",
    skool:
      "Skool wins on simplicity and discovery, but Kazokus now matches the discovery marketplace while adding everything Skool lacks: branding, white-label, courses with certificates, marketplace, events with ticketing, AI assistant, and multi-community support.",
    bettermode:
      'Kazokus provides a more complete platform at SMB pricing ($49-99/mo vs $199-599/mo). Better for teams that need courses, events, marketplace, and bookings alongside community — without the enterprise price tag.',
    hivebrite:
      "Kazokus delivers 80% of Hivebrite's functionality at 1/8 the price. Multi-tenancy handles the chapters/regional network use case. Missing Hivebrite's job board and fundraising tools, but the $700/mo savings more than covers third-party alternatives.",
    heartbeat:
      "Both platforms target creators, but Kazokus offers a more complete toolkit: marketplace, bookings, CRM, multi-tenancy, and a more mature API. Heartbeat's cohort courses are a unique strength Kazokus doesn't yet match.",
  };
  return verdicts[comp.slug] ?? `Kazokus offers a compelling alternative to ${comp.name} with zero transaction fees, built-in AI, and multi-tenancy.`;
}
