import { useState, useEffect, useContext } from "react";
import {
  Mail,
  MapPin,
  MessageCircle,
  Send,
  Clock,
  Users,
  Headphones,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Dropdown } from "../components/General/Dropdown";
import { inquiryTypes } from "../constants";
import { contactUs } from "../services/apis/userApi";

export default function ContactUs() {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });
  const [inquiryType, setInquiryType] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData, inquiryType);
    formData.query = inquiryType?.label;

    await contactUs(formData, setIsSubmitted);
  };

  const contactMethods = [
    {
      icon: <Mail className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Email Us",
      description: "Get in touch via email",
      contact: "hello@simjob.ai",
      action: "Send Email",
    },
    {
      icon: <MessageCircle className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Live Chat",
      description: "Chat with our support team",
      contact: "Available 24/7",
      action: "Start Chat",
    },
    {
      icon: <Headphones className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Support Center",
      description: "Browse our help resources",
      contact: "FAQ & Guides",
      action: "Visit Help Center",
    },
  ];

  const faqs = [
    {
      question: "How does the AI interviewer work?",
      answer:
        "Our AI conducts real-time voice conversations, asking questions based on your target company and role, then provides instant feedback on your responses.",
    },
    {
      question: "Is my practice data secure?",
      answer:
        "Yes, we use enterprise-grade security to protect your practice sessions and personal information. Your data is encrypted and never shared.",
    },
    {
      question: "Can I practice for specific companies?",
      answer:
        "Absolutely! SimJob offers company-specific interview scenarios and questions tailored to your target organization's hiring process.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div
        className={`relative overflow-hidden bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="container mx-auto !px-4 sm:!px-6 lg:!px-8 !py-16 sm:!py-20 lg:!py-32 text-center flex items-center justify-center flex-col">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-gray-900 !mb-4 sm:!mb-6 tracking-tight">
            Contact{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              SimJob
            </span>
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 !mb-6 sm:!mb-8 max-w-3xl mx-auto leading-relaxed">
            Have questions? Need support? Want to partner with us? We're here to
            help!
          </p>
          <div className="flex justify-center">
            <div className="bg-white/80 backdrop-blur-sm rounded-full !px-6 sm:!px-8 !py-3 border border-gray-200 shadow-lg">
              <span className="text-gray-800 font-medium text-sm sm:text-base">
                💬 We typically respond within 2 hours
              </span>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 sm:w-40 sm:h-40 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-xl"></div>
      </div>

      {/* Contact Methods */}
      <div className="container mx-auto !px-4 sm:!px-6 lg:!px-8 !py-16 sm:!py-20">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 !mb-12 sm:!mb-16 text-center">
          Get in{" "}
          <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Touch
          </span>
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto !mb-16 sm:!mb-20">
          {contactMethods.map((method, index) => (
            <div
              key={index}
              className="group bg-gradient-to-br from-white to-indigo-50 rounded-xl sm:rounded-2xl !p-6 sm:!p-8 border border-gray-200 hover:border-indigo-300 transition-all duration-300 hover:scale-105 hover:shadow-xl text-center"
            >
              <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg sm:rounded-xl !p-3 sm:!p-4 w-fit mx-auto !mb-4 sm:!mb-6 group-hover:scale-110 transition-transform duration-300">
                {method.icon}
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 !mb-2 sm:!mb-3">
                {method.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-600 !mb-2">
                {method.description}
              </p>
              <p className="text-sm sm:text-base font-semibold text-indigo-600 !mb-4">
                {method.contact}
              </p>
              <button className="text-sm sm:text-base text-indigo-600 hover:text-indigo-800 font-medium group-hover:underline transition-colors duration-300">
                {method.action}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Form */}
      <div className="bg-gradient-to-br from-gray-50 to-indigo-50 !py-16 sm:!py-20">
        <div className="container mx-auto flex items-center justify-center !px-4 sm:!px-6 lg:!px-8">
          <div className="bg-white rounded-2xl sm:rounded-3xl !p-6 sm:!p-12 lg:!p-16 shadow-xl max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 !mb-6 sm:!mb-8 text-center">
              Send us a{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Message
              </span>
            </h2>

            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center text-center !py-12 sm:!py-16">
                <div className="bg-green-500 rounded-full w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mx-auto !mb-6">
                  <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 !mb-4">
                  Message Sent!
                </h3>
                <p className="text-base sm:text-lg text-gray-600">
                  Thank you for reaching out. We'll get back to you within 24
                  hours.
                </p>
              </div>
            ) : (
              <form onSubmit={(e) => handleSubmit(e)}>
                <div className="!space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="fullName"
                        className="block text-sm sm:text-base font-medium text-gray-700 !mb-2"
                      >
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                        className="w-full !px-4 !py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-300 text-sm sm:text-base text-gray-700"
                        placeholder="Full Name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm sm:text-base font-medium text-gray-700 !mb-2"
                      >
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full !px-4 !py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-300 text-sm sm:text-base text-gray-700"
                        placeholder="Enter email...."
                      />
                    </div>
                  </div>

                  {/* <div>
                    <label
                      htmlFor="inquiryType"
                      className="block text-sm sm:text-base font-medium text-gray-700 !mb-2"
                    >
                      Inquiry Type
                    </label>
                    <select
                      id="inquiryType"
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleInputChange}
                      className="w-full !px-4 !py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-300 text-sm sm:text-base text-gray-700 cursor-pointer"
                    >
                      {inquiryTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div> */}
                  <Dropdown
                    label={"Inquiry Type"}
                    options={inquiryTypes}
                    value={inquiryType}
                    onChange={setInquiryType}
                    placeholder="Select inquiry type..."
                    required
                  />
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm sm:text-base font-medium text-gray-700 !mb-2"
                    >
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full !px-4 !py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-300 text-sm sm:text-base text-gray-700"
                      placeholder="Brief description of your inquiry"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm sm:text-base font-medium text-gray-700 !mb-2"
                    >
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full !px-4 !py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-300 resize-none text-sm sm:text-base text-gray-700"
                      placeholder="Tell us more about your inquiry..."
                    />
                  </div>

                  <div className="text-center">
                    <button
                      type="submit"
                      className="group bg-gradient-to-r from-indigo-600 to-purple-600 text-white !px-8 sm:!px-10 !py-3 sm:!py-4 rounded-full font-bold text-base sm:text-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 inline-flex items-center shadow-lg cursor-pointer"
                    >
                      Send Message
                      <Send className="w-4 h-4 sm:w-5 sm:h-5 !ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Support Information */}
      <div className="container mx-auto !px-4 sm:!px-6 lg:!px-8 !py-16 sm:!py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 !mb-12 sm:!mb-16 text-center">
            Support{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Information
            </span>
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl sm:rounded-2xl !p-6 sm:!p-8 border border-indigo-200 text-center">
              <Clock className="w-12 h-12 sm:w-16 sm:h-16 text-indigo-600 mx-auto !mb-4" />
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 !mb-2">
                Response Time
              </h3>
              <p className="text-sm sm:text-base text-gray-600 !mb-4">
                We aim to respond to all inquiries within 2-4 hours during
                business hours
              </p>
              <div className="text-xs sm:text-sm text-indigo-600 font-medium">
                Mon-Fri: 9 AM - 6 PM IST
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl sm:rounded-2xl !p-6 sm:!p-8 border border-purple-200 text-center">
              <Users className="w-12 h-12 sm:w-16 sm:h-16 text-purple-600 mx-auto !mb-4" />
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 !mb-2">
                Community
              </h3>
              <p className="text-sm sm:text-base text-gray-600 !mb-4">
                Join our community of interview candidates and share experiences
              </p>
              <div className="text-xs sm:text-sm text-purple-600 font-medium">
                Discord & Slack Available
              </div>
            </div>

            <div className="bg-gradient-to-br from-pink-50 to-orange-50 rounded-xl sm:rounded-2xl !p-6 sm:!p-8 border border-pink-200 text-center sm:col-span-2 lg:col-span-1">
              <Headphones className="w-12 h-12 sm:w-16 sm:h-16 text-pink-600 mx-auto !mb-4" />
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 !mb-2">
                Priority Support
              </h3>
              <p className="text-sm sm:text-base text-gray-600 !mb-4">
                Premium users get priority support and dedicated assistance
              </p>
              <div className="text-xs sm:text-sm text-pink-600 font-medium">
                Available 24/7
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-gradient-to-br from-gray-50 to-indigo-50 !py-16 sm:!py-20">
        <div className="container mx-auto !px-4 sm:!px-6 lg:!px-8 flex items-center justify-center ">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 !mb-12 sm:!mb-16 text-center">
              Frequently Asked{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Questions
              </span>
            </h2>

            <div className="!space-y-6 sm:!space-y-8">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl sm:rounded-2xl !p-6 sm:!p-8 shadow-lg border border-gray-200"
                >
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 !mb-3 sm:!mb-4">
                    {faq.question}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>

            {/* <div className="text-center !mt-8 sm:!mt-12">
              <p className="text-base sm:text-lg text-gray-600 !mb-4">
                Can't find what you're looking for?
              </p>
              <button className="text-indigo-600 hover:text-indigo-800 font-medium text-sm sm:text-base hover:underline transition-colors duration-300">
                Browse our complete Help Center →
              </button>
            </div> */}
          </div>
        </div>
      </div>

      {/* Office Information */}
      <div className="container mx-auto !px-4 sm:!px-6 lg:!px-8 !py-16 sm:!py-20">
        <div className="bg-white rounded-2xl sm:rounded-3xl !p-6 sm:!p-12 lg:!p-16 shadow-xl border border-gray-100 max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 !mb-6 sm:!mb-8">
                Let's{" "}
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Connect
                </span>
              </h2>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed !mb-6 sm:!mb-8">
                Whether you're a job candidate looking to improve your interview
                skills, a company interested in partnering with us, or someone
                with feedback about our platform, we'd love to hear from you.
              </p>

              <div className="!space-y-4 sm:!space-y-6">
                <div className="flex items-center">
                  <div className="bg-indigo-100 rounded-full !p-2 sm:!p-3 !mr-4">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm sm:text-base">
                      Email
                    </h4>
                    <p className="text-gray-600 text-sm sm:text-base">
                      hello@simjob.ai
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="bg-purple-100 rounded-full !p-2 sm:!p-3 !mr-4">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm sm:text-base">
                      Location
                    </h4>
                    <p className="text-gray-600 text-sm sm:text-base">
                      Nagpur, Maharashtra, India
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="bg-pink-100 rounded-full !p-2 sm:!p-3 !mr-4">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-pink-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm sm:text-base">
                      Business Hours
                    </h4>
                    <p className="text-gray-600 text-sm sm:text-base">
                      Mon-Fri: 9:00 AM - 6:00 PM IST
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl sm:rounded-2xl !p-6 sm:!p-8 border border-indigo-200">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 !mb-4 sm:!mb-6">
                Quick Response Promise
              </h3>
              <div className="!space-y-3 sm:!space-y-4">
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 !mr-3 flex-shrink-0" />
                  <span className="text-gray-700 text-sm sm:text-base">
                    General inquiries: 2-4 hours
                  </span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 !mr-3 flex-shrink-0" />
                  <span className="text-gray-700 text-sm sm:text-base">
                    Technical support: 1-2 hours
                  </span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 !mr-3 flex-shrink-0" />
                  <span className="text-gray-700 text-sm sm:text-base">
                    Business inquiries: 24 hours
                  </span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 !mr-3 flex-shrink-0" />
                  <span className="text-gray-700 text-sm sm:text-base">
                    Emergency support: Immediate
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto !px-4 sm:!px-6 lg:!px-8 !py-16 sm:!py-20 flex items-center justify-center">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl sm:rounded-3xl !p-8 sm:!p-12 lg:!p-16 text-center shadow-2xl max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white !mb-4 sm:!mb-6">
            Ready to Start Practicing?
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-indigo-100 !mb-6 sm:!mb-8 leading-relaxed">
            Don't wait for your next interview to practice. Start improving your
            skills today with SimJob.
          </p>
          <button
            className="group bg-white text-indigo-600 !px-6 sm:!px-8 !py-3 sm:!py-4 rounded-full font-bold text-base sm:text-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 inline-flex items-center shadow-lg cursor-pointer"
            onClick={() => navigate(isLoggedIn ? "/dashboard" : "/signup")}
          >
            Try SimJob Free
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 !ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="container mx-auto !px-4 sm:!px-6 lg:!px-8 !py-8 sm:!py-12 text-center border-t border-gray-200">
        <p className="text-gray-600 text-sm sm:text-base lg:text-lg">
          © 2025 SimJob. We're here to help you succeed in your career journey.
        </p>
      </div>
    </div>
  );
}
