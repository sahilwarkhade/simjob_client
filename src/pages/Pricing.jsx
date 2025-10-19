import React, { useState } from 'react';
import { Check, Zap, Building2, Rocket, Users, TrendingUp } from 'lucide-react';

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [hoveredPlan, setHoveredPlan] = useState(null);

  const plans = [
    {
      name: 'Starter',
      icon: Zap,
      description: 'Perfect for getting started with interview prep',
      monthlyPrice: 0,
      yearlyPrice: 0,
      popular: false,
      features: [
        '5 AI mock interviews per month',
        'Basic company simulations',
        'Text-based feedback',
        'Progress dashboard',
        'Community support'
      ],
      cta: 'Start Free',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      name: 'Professional',
      icon: Building2,
      description: 'Ideal for serious job seekers',
      monthlyPrice: 29,
      yearlyPrice: 290,
      popular: true,
      features: [
        'Unlimited AI mock interviews',
        '50+ company-specific simulations',
        'Voice & video AI interviewer',
        'Detailed AI feedback & scoring',
        'Performance analytics',
        'Interview recording playback',
        'Priority support'
      ],
      cta: 'Get Started',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      name: 'Enterprise',
      icon: Rocket,
      description: 'Custom solutions for teams & organizations',
      monthlyPrice: null,
      yearlyPrice: null,
      popular: false,
      features: [
        'Everything in Professional',
        'Custom company simulations',
        'Team management dashboard',
        'Advanced analytics & reporting',
        'API access',
        'Dedicated account manager',
        'Custom integrations',
        'SLA guarantee'
      ],
      cta: 'Contact Sales',
      gradient: 'from-orange-500 to-red-500'
    }
  ];

  const stats = [
    { label: 'Active Users', value: '50K+', icon: Users },
    { label: 'Success Rate', value: '94%', icon: TrendingUp },
    { label: 'Companies', value: '200+', icon: Building2 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDUpIi8+PC9nPjwvc3ZnPg==')] opacity-40"></div>
        
        <div className="max-w-7xl !mx-auto !px-4 sm:!px-6 lg:!px-8 !py-20 relative">
          <div className="text-center !mb-16">
            <div className="inline-flex items-center !gap-2 !px-4 !py-2 bg-purple-500/20 rounded-full !mb-6 backdrop-blur-sm border border-purple-500/30">
              <Zap className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-medium text-purple-300">Pricing Plans</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold !mb-6 bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
              Master Your Interview Game
            </h1>
            
            <p className="text-xl text-gray-300 max-w-2xl !mx-auto !mb-8">
              Practice with AI-powered mock interviews and land your dream job with confidence
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center !gap-8 !mb-12">
              {stats.map((stat, idx) => (
                <div key={idx} className="flex items-center !gap-3 !px-6 !py-3 bg-white/5 rounded-lg backdrop-blur-sm border border-white/10">
                  <stat.icon className="w-5 h-5 text-purple-400" />
                  <div className="text-left">
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center !gap-4 !mb-12">
              <span className={`text-sm font-medium ${billingCycle === 'monthly' ? 'text-white' : 'text-gray-400'}`}>
                Monthly
              </span>
              <button
                onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
                className="relative w-14 h-7 bg-purple-600 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900"
              >
                <span
                  className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform duration-300 ${
                    billingCycle === 'yearly' ? 'translate-x-7' : 'translate-x-0'
                  }`}
                />
              </button>
              <span className={`text-sm font-medium ${billingCycle === 'yearly' ? 'text-white' : 'text-gray-400'}`}>
                Yearly
              </span>
              {billingCycle === 'yearly' && (
                <span className="!ml-2 !px-3 !py-1 bg-green-500/20 text-green-400 text-xs font-semibold rounded-full border border-green-500/30">
                  Save 17%
                </span>
              )}
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 !gap-8 max-w-7xl !mx-auto">
            {plans.map((plan, idx) => {
              const Icon = plan.icon;
              const price = billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
              
              return (
                <div
                  key={idx}
                  onMouseEnter={() => setHoveredPlan(idx)}
                  onMouseLeave={() => setHoveredPlan(null)}
                  className={`relative rounded-2xl !p-8 transition-all duration-300 ${
                    plan.popular
                      ? 'bg-gradient-to-br from-purple-600/30 to-pink-600/30 border-2 border-purple-500/50 scale-105 shadow-2xl shadow-purple-500/20'
                      : 'bg-white/5 border border-white/10 hover:border-purple-500/50'
                  } ${hoveredPlan === idx ? 'transform -translate-y-2 shadow-2xl' : ''} backdrop-blur-xl`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 !px-4 !py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold rounded-full shadow-lg">
                      Most Popular
                    </div>
                  )}

                  <div className="text-center !mb-8">
                    <div className={`inline-flex !p-3 rounded-xl bg-gradient-to-br ${plan.gradient} !mb-4`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white !mb-2">{plan.name}</h3>
                    <p className="text-gray-400 text-sm">{plan.description}</p>
                  </div>

                  <div className="text-center !mb-8">
                    {price !== null ? (
                      <>
                        <div className="flex items-baseline justify-center !gap-1">
                          <span className="text-5xl font-bold text-white">${price}</span>
                          <span className="text-gray-400">/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
                        </div>
                        {billingCycle === 'yearly' && price > 0 && (
                          <p className="text-sm text-gray-400 !mt-2">
                            ${(price / 12).toFixed(0)}/month billed annually
                          </p>
                        )}
                      </>
                    ) : (
                      <div className="text-3xl font-bold text-white">Custom</div>
                    )}
                  </div>

                  <button
                    className={`w-full !py-3 !px-6 rounded-xl font-semibold transition-all duration-300 !mb-8 ${
                      plan.popular
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg hover:shadow-purple-500/50 hover:scale-105'
                        : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                    }`}
                  >
                    {plan.cta}
                  </button>

                  <div className="!space-y-4">
                    {plan.features.map((feature, fidx) => (
                      <div key={fidx} className="flex items-start !gap-3">
                        <div className={`!mt-0.5 !p-1 rounded-full bg-gradient-to-br ${plan.gradient}`}>
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-gray-300 text-sm flex-1">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* FAQ Section */}
          <div className="!mt-24 text-center">
            <h2 className="text-3xl font-bold text-white !mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-400 !mb-12 max-w-2xl !mx-auto">
              Have questions? We're here to help you succeed in your interview journey.
            </p>
            
            <div className="grid md:grid-cols-2 !gap-6 max-w-4xl !mx-auto text-left">
              {[
                {
                  q: 'Can I switch plans anytime?',
                  a: 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately.'
                },
                {
                  q: 'What happens after my free trial?',
                  a: 'Your Starter plan continues forever for free. Upgrade anytime for unlimited access.'
                },
                {
                  q: 'Do you offer refunds?',
                  a: 'We offer a 14-day money-back guarantee on all paid plans. No questions asked.'
                },
                {
                  q: 'Can I cancel my subscription?',
                  a: 'Yes, you can cancel anytime. You\'ll retain access until the end of your billing period.'
                }
              ].map((faq, idx) => (
                <div key={idx} className="!p-6 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
                  <h3 className="text-lg font-semibold text-white !mb-2">{faq.q}</h3>
                  <p className="text-gray-400 text-sm">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="!mt-24 text-center !p-12 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl border border-purple-500/30 backdrop-blur-xl">
            <h2 className="text-3xl font-bold text-white !mb-4">
              Ready to ace your next interview?
            </h2>
            <p className="text-gray-300 !mb-8 max-w-2xl !mx-auto">
              Join thousands of successful candidates who transformed their interview skills with SimJob.
            </p>
            <button className="!px-8 !py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105">
              Start Your Free Trial
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}