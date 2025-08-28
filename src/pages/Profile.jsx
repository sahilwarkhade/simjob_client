import { useState, useEffect, useContext } from "react";
import {
  User,
  Settings,
  Bell,
  Shield,
  Briefcase,
  Edit3,
  Save,
  X,
  Camera,
  Mail,
  Phone,
  MapPin,
  Globe,
  Trash2,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  Star,
} from "lucide-react";
import { GrOverview } from "react-icons/gr";
import QuickStats from "../components/Dashboard/QuickStats";
import RecentActivity from "../components/Dashboard/RecentActivity";
import ProfileModal from "../components/Profile/ProfileModal";
import DeleteAccountModal from "../components/Profile/DeleteAccountModal";
import { AuthContext } from "../context/AuthContext";
import {
  getUserProfile,
  updatePassword,
  updatePersonalProfileDetails,
  updateProfessionalProfileDetails,
} from "../services/apis/userApi";
import { Spinner } from "../components/Spinner/Spinner";
import { Dropdown } from "../components/General/Dropdown";
import { experienceLevels, genderOptions, skills } from "../constants";
import { useNavigate } from "react-router-dom";

const userStats = {
  totalMockSessions: 47,
  averageMockScore: 8.2,
  totalOASessions: 12,
  averageOAScore: 7,
};
const recentSessions = [
  {
    id: 1,
    company: "Google",
    role: "Software Engineer",
    date: "2025-01-10",
    duration: "25 min",
    score: 8.5,
    status: "completed",
    feedback: "Great technical responses, work on behavioral questions",
  },
  {
    id: 2,
    company: "Microsoft",
    role: "Product Manager",
    date: "2025-01-09",
    duration: "30 min",
    score: 7.8,
    status: "completed",
    feedback: "Strong product thinking, improve on leadership examples",
  },
  {
    id: 3,
    company: "Amazon",
    role: "Data Scientist",
    date: "2025-01-08",
    duration: "22 min",
    score: 8.9,
    status: "completed",
    feedback: "Excellent problem-solving approach",
  },
];
const sections = [
  {
    id: "personal",
    label: "Personal Info",
    icon: <User className="w-4 h-4" />,
  },
  {
    id: "overview",
    label: "Overview",
    icon: <GrOverview className="w-4 h-4" />,
  },
  {
    id: "professional",
    label: "Professional",
    icon: <Briefcase className="w-4 h-4" />,
  },
  // {
  //   id: "preferences",
  //   label: "Preferences",
  //   icon: <Settings className="w-4 h-4" />,
  // },
  {
    id: "notifications",
    label: "Notifications",
    icon: <Bell className="w-4 h-4" />,
  },
  {
    id: "privacy",
    label: "Privacy & Security",
    icon: <Shield className="w-4 h-4" />,
  },
  // { id: 'achievements', label: 'Achievements', icon: <Award className="w-4 h-4" /> }
];

const achievements = [
  {
    title: "First Interview",
    description: "Completed your first AI interview session",
    icon: "🎯",
    earned: true,
    date: "2024-12-15",
  },
  {
    title: "Week Warrior",
    description: "Practiced for 7 consecutive days",
    icon: "🔥",
    earned: true,
    date: "2025-01-05",
  },
  {
    title: "Perfect Score",
    description: "Achieved a 10/10 score in an interview",
    icon: "⭐",
    earned: true,
    date: "2025-01-08",
  },
  {
    title: "Tech Master",
    description: "Completed 20+ technical interviews",
    icon: "💻",
    earned: false,
    progress: 85,
  },
  {
    title: "FAANG Ready",
    description: "Practice with all FAANG companies",
    icon: "🚀",
    earned: false,
    progress: 60,
  },
];

export function Profile() {
  const navigate = useNavigate();
  const { user, setUser, loading, setLoading, setIsLoggedIn} = useContext(AuthContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPhoto, setCurrentPhoto] = useState(
    "https://t4.ftcdn.net/jpg/07/03/86/11/360_F_703861114_7YxIPnoH8NfmbyEffOziaXy0EO1NpRHD.jpg"
  );
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [activeSection, setActiveSection] = useState("personal");
  const [isEditing, setIsEditing] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [profilePersonalData, setProfilePersonalData] = useState({
    fullName: "",
    email: "",
    mobileNumber: "",
    address: "",
    website: "",
    linkedinUrl: "",
    bio: "",
  });

  const [editingProfilePersonalData, setEditingProfilePersonalData] =
    useState(null);

  const [gender, setGender] = useState(genderOptions[2]);
  const [editGender, setEditGender] = useState(null);

  const [profileProfessionalData, setProfileProfessionalData] = useState({
    currentRole: "",
    targetRole: "",
    skills: [],
    targetCompanies: [],
  });

  const [editingProfilProfessionalData, setEditingProfilProfessionalData] =
    useState(null);

  const [experience, setExperience] = useState(experienceLevels[0]);
  const [editExperience, setEditExperience] = useState(null);

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    weeklyReports: true,
    practiceReminders: true,
    marketingEmails: false,
    theme: "light",
    language: "en",
    timezone: "Asia/Kolkata",
    voiceSpeed: "normal",
    feedbackDetail: "detailed",
  });

  useEffect(() => {
    if (!user) {
      (async () => {
        await getUserProfile(setUser);
      })();
    }

    if (user) {
      const userPersonalData = {
        fullName: user?.fullName || "",
        email: user?.email || "",
        mobileNumber:
          user?.additionalDetails?.personalInformation?.mobileNumber,
        address: user?.additionalDetails?.personalInformation?.address,
        website: user?.additionalDetails?.personalInformation?.website,
        linkedinUrl: user?.additionalDetails?.personalInformation?.linkedinUrl,
        bio: user?.additionalDetails?.personalInformation?.bio,
      };

      setProfilePersonalData({ ...userPersonalData });

      setGender(user?.additionalDetails?.personalInformation?.gender || "");
    }
    if (user) {
      const userProfessionalData = {
        currentRole:
          user?.additionalDetails?.professionalInformation?.currentRole,
        targetRole:
          user?.additionalDetails?.professionalInformation?.targetedRole,
        skills: [...user?.additionalDetails?.professionalInformation?.skills],
        targetCompanies: [
          ...user?.additionalDetails?.professionalInformation?.targetCompanies,
        ],
      };
      setProfileProfessionalData({ ...userProfessionalData });
      setExperience(
        user?.additionalDetails?.professionalInformation?.experienceLevel
      );
    }
    setLoading(false);
  }, [user, setUser]);

  const handlePersonalInputChange = (field, value) => {
    setEditingProfilePersonalData((prev) => ({ ...prev, [field]: value }));
  };

  const handleProfesssionalInputChange = (field, value) => {
    setEditingProfilProfessionalData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePreferenceChange = (field, value) => {
    setPreferences((prev) => ({ ...prev, [field]: value }));
  };

  const handleEdit = (e) => {
    e.preventDefault();

    if (activeSection === "personal") {
      setEditingProfilePersonalData({ ...profilePersonalData });
      setEditGender(gender);
      setIsEditing(true);
    }

    if (activeSection === "professional") {
      setEditingProfilProfessionalData({
        ...profileProfessionalData,
        skills: [...profileProfessionalData.skills],
        targetCompanies: [...profileProfessionalData.targetCompanies],
      });
      setEditExperience(experience);
      setIsEditing(true);
    }
  };

  const saveProfile = async (e) => {
    e.preventDefault();
    if (activeSection === "personal") {
      const response = await updatePersonalProfileDetails({
        ...editingProfilePersonalData,
        gender: editGender?.label,
      });
      if (response?.data?.success) {
        await getUserProfile(setUser);
        setGender(editGender);
        setProfilePersonalData(editingProfilePersonalData);
        setIsEditing(false);
      }
    }
    if (activeSection === "professional") {
      const response = await updateProfessionalProfileDetails({
        ...editingProfilProfessionalData,
        experience: editExperience?.label,
      });
      if (response?.data?.success) {
        await getUserProfile(setUser);
        setProfileProfessionalData(editingProfilProfessionalData);
        setExperience(editExperience);
        setIsEditing(false);
      }
    }
  };

  const cancelEdit = () => {
    setEditingProfilePersonalData(null);
    setEditingProfilProfessionalData(null);
    setEditGender(null);
    setEditExperience(null);
    setIsEditing(false);
  };

  const handelUpdatePassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await updatePassword(
      currentPassword,
      password,
      confirmPassword,
      navigate
    );
    console.log(response)
    setLoading(false);
    setIsLoggedIn(true);
  };

  let isNotLocalLogin = false;
  if (user) {
    isNotLocalLogin = user?.authStrategy !== "local";
  }

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-white flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gray-50">
      <div className="!pt-12"></div>
      <div className="max-w-7xl !mx-auto !px-4 sm:!px-6 lg:!px-8 !py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 !p-6">
              <div className="text-center !mb-6">
                <div className="relative inline-block">
                  <div className="w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold !mb-4">
                    {currentPhoto ? (
                      <img
                        src={currentPhoto}
                        alt="Profile"
                        className="w-full h-full rounded-full object-cover overflow-hidden"
                      />
                    ) : (
                      profilePersonalData?.fullName[0]
                    )}
                  </div>
                  <button
                    className="absolute bottom-0 right-0 bg-white border border-gray-300 rounded-full !p-1 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => {
                      setIsModalOpen((prev) => !prev);
                    }}
                  >
                    <Camera className="w-3 h-3 text-gray-600" />
                  </button>
                </div>
                <h3 className="font-semibold text-gray-900">
                  {profilePersonalData.fullName}
                </h3>
                <p className="text-sm text-gray-600 capitalize">
                  {profileProfessionalData.currentRole}
                </p>
              </div>

              <nav className="!space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center !space-x-3 !px-3 !py-2 text-left rounded-lg transition-colors cursor-pointer ${
                      activeSection === section.id
                        ? "bg-indigo-50 text-indigo-600 border-indigo-200"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {section.icon}
                    <span className="text-sm font-medium">{section.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              {/* Section Header */}
              <div className="!px-6 !py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {sections.find((s) => s.id === activeSection)?.label}
                  </h2>
                  {(activeSection === "personal" ||
                    activeSection === "professional") && (
                    <div className="flex items-center !space-x-2">
                      {isEditing ? (
                        <>
                          <button
                            onClick={(e) => saveProfile(e)}
                            className="flex items-center !space-x-2 !px-3 !py-1.5 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer"
                          >
                            <Save className="w-4 h-4" />
                            <span>Save</span>
                          </button>
                          <button
                            onClick={(e) => cancelEdit(e)}
                            className="flex items-center !space-x-2 !px-3 !py-1.5 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                          >
                            <X className="w-4 h-4" />
                            <span>Cancel</span>
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={(e) => handleEdit(e)}
                          className="flex items-center !space-x-2 !px-3 !py-1.5 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                        >
                          <Edit3 className="w-4 h-4" />
                          <span>Edit</span>
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Personal Information */}
              {activeSection === "personal" && (
                <>
                  <div className="!p-6 !space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 !mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={
                            isEditing
                              ? editingProfilePersonalData?.fullName
                              : profilePersonalData?.fullName
                          }
                          onChange={(e) =>
                            handlePersonalInputChange(
                              "fullName",
                              e.target.value
                            )
                          }
                          disabled={!isEditing}
                          className={`w-full !px-3 !py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-50 disabled:text-gray-500 ${
                            isEditing ? "cursor-pointer" : "cursor-not-allowed"
                          } text-gray-600`}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 !mb-2 ">
                          Gender
                        </label>

                        <Dropdown
                          options={genderOptions}
                          value={isEditing ? editGender : gender}
                          onChange={setEditGender}
                          placeholder="Select your gender"
                          size="lg"
                          disabled={!isEditing}
                          variant="filled"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 !mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="email"
                          value={
                            isEditing
                              ? editingProfilePersonalData?.email
                              : profilePersonalData?.email
                          }
                          onChange={(e) =>
                            handlePersonalInputChange("email", e.target.value)
                          }
                          disabled={true}
                          className={`w-full !pl-10 !pr-3 !py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-50 disabled:text-gray-500
                            cursor-not-allowed text-gray-600`}
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 !mb-2">
                          Phone Number
                        </label>
                        <div className="relative">
                          <Phone className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <input
                            type="tel"
                            value={
                              isEditing
                                ? editingProfilePersonalData?.mobileNumber
                                : profilePersonalData?.mobileNumber
                            }
                            onChange={(e) =>
                              handlePersonalInputChange(
                                "mobileNumber",
                                e.target.value
                              )
                            }
                            placeholder="+91-xxxx-xx-xxxx"
                            disabled={!isEditing}
                            className={`w-full !pl-10 !pr-3 !py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-50 disabled:text-gray-500 ${
                              isEditing
                                ? "cursor-pointer"
                                : "cursor-not-allowed"
                            } text-gray-600`}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 !mb-2">
                          Location
                        </label>
                        <div className="relative">
                          <MapPin className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <input
                            type="text"
                            value={
                              isEditing
                                ? editingProfilePersonalData?.address
                                : profilePersonalData?.address
                            }
                            onChange={(e) =>
                              handlePersonalInputChange(
                                "address",
                                e.target.value
                              )
                            }
                            placeholder="Enter your address..."
                            disabled={!isEditing}
                            className={`w-full !pl-10 !pr-3 !py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-50 disabled:text-gray-500 capitalize ${
                              isEditing
                                ? "cursor-pointer"
                                : "cursor-not-allowed"
                            } text-gray-600`}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 !mb-2">
                          Website
                        </label>
                        <div className="relative">
                          <Globe className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <input
                            type="url"
                            value={
                              isEditing
                                ? editingProfilePersonalData?.website
                                : profilePersonalData?.website
                            }
                            onChange={(e) =>
                              handlePersonalInputChange(
                                "website",
                                e.target.value
                              )
                            }
                            placeholder="https://..."
                            disabled={!isEditing}
                            className={`w-full !pl-10 !pr-3 !py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-50 disabled:text-gray-500 ${
                              isEditing
                                ? "cursor-pointer"
                                : "cursor-not-allowed"
                            } text-gray-600`}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 !mb-2">
                          LinkedIn
                        </label>
                        <div className="relative">
                          <Globe className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <input
                            type="url"
                            value={
                              isEditing
                                ? editingProfilePersonalData?.linkedinUrl
                                : profilePersonalData?.linkedinUrl
                            }
                            onChange={(e) =>
                              handlePersonalInputChange(
                                "linkedinUrl",
                                e.target.value
                              )
                            }
                            placeholder="https://..."
                            disabled={!isEditing}
                            className={`w-full !pl-10 !pr-3 !py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-50 disabled:text-gray-500 ${
                              isEditing
                                ? "cursor-pointer"
                                : "cursor-not-allowed"
                            } text-gray-600`}
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 !mb-2">
                        Bio
                      </label>
                      <textarea
                        value={
                          isEditing
                            ? editingProfilePersonalData?.bio
                            : profilePersonalData?.bio
                        }
                        onChange={(e) =>
                          handlePersonalInputChange("bio", e.target.value)
                        }
                        disabled={!isEditing}
                        rows={4}
                        className={`w-full !px-3 !py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-50 disabled:text-gray-500 resize-none ${
                          isEditing ? "cursor-pointer" : "cursor-not-allowed"
                        }  text-gray-600`}
                        placeholder="Tell us about yourself..."
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Professional Information */}
              {activeSection === "professional" && (
                <div className="!p-6 !space-y-6 text-gray-600">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 !mb-2">
                        Current Role
                      </label>
                      <input
                        type="text"
                        value={
                          isEditing
                            ? editingProfilProfessionalData?.currentRole
                            : profileProfessionalData?.currentRole
                        }
                        onChange={(e) =>
                          handleProfesssionalInputChange(
                            "currentRole",
                            e.target.value
                          )
                        }
                        disabled={!isEditing}
                        placeholder="eg. software developer"
                        className={`w-full !px-3 !py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-50 disabled:text-gray-500 capitalize ${
                          isEditing ? "cursor-pointer" : "cursor-not-allowed"
                        }`}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 !mb-2">
                        Target Role
                      </label>
                      <input
                        type="text"
                        value={
                          isEditing
                            ? editingProfilProfessionalData?.targetRole
                            : profileProfessionalData?.targetRole
                        }
                        onChange={(e) =>
                          handleProfesssionalInputChange(
                            "targetRole",
                            e.target.value
                          )
                        }
                        disabled={!isEditing}
                        placeholder="eg. senior software developer"
                        className={`w-full !px-3 !py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-50 disabled:text-gray-500 capitalize ${
                          isEditing ? "cursor-pointer" : "cursor-not-allowed"
                        }`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 !mb-2">
                      Experience Level
                    </label>

                    <Dropdown
                      options={experienceLevels}
                      value={isEditing ? editExperience : experience}
                      onChange={setEditExperience}
                      placeholder="How much experience you have..."
                      size="lg"
                      disabled={!isEditing}
                      variant="filled"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 !mb-2">
                      Skills
                    </label>
                    <div className="flex flex-wrap gap-2 !mb-3">
                      {(isEditing
                        ? editingProfilProfessionalData
                        : profileProfessionalData
                      ).skills.map((skill, index) => (
                        <span
                          key={index}
                          className="!px-3 !py-1 bg-indigo-100 text-indigo-800 text-sm rounded-full flex items-center !space-x-1 capitalize"
                        >
                          <span>{skill}</span>
                          {isEditing && (
                            <button
                              onClick={() => {
                                const newSkills =
                                  editingProfilProfessionalData?.skills.filter(
                                    (_, i) => i !== index
                                  );
                                handleProfesssionalInputChange(
                                  "skills",
                                  newSkills
                                );
                              }}
                              className="text-indigo-600 hover:text-indigo-800 cursor-pointer "
                            >
                              <X className="w-3 h-3" />
                            </button>
                          )}
                        </span>
                      ))}
                    </div>
                    {isEditing && (
                      <input
                        type="text"
                        placeholder="Add a skill and press Enter"
                        className="w-full !px-3 !py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        onKeyPress={(e) => {
                          if (e.key === "Enter" && e.target.value.trim()) {
                            handleProfesssionalInputChange("skills", [
                              ...editingProfilProfessionalData?.skills,
                              e.target.value.trim(),
                            ]);
                            e.target.value = "";
                          }
                        }}
                      />
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 !mb-2">
                      Target Companies
                    </label>
                    <div className="flex flex-wrap gap-2 !mb-3">
                      {(isEditing
                        ? editingProfilProfessionalData
                        : profileProfessionalData
                      )?.targetCompanies.map((company, index) => (
                        <span
                          key={index}
                          className="!px-3 !py-1 bg-purple-100 text-purple-800 text-sm rounded-full flex items-center !space-x-1 capitalize"
                        >
                          <span>{company}</span>
                          {isEditing && (
                            <button
                              onClick={() => {
                                const newCompanies =
                                  editingProfilProfessionalData?.targetCompanies.filter(
                                    (_, i) => i !== index
                                  );
                                handleProfesssionalInputChange(
                                  "targetCompanies",
                                  newCompanies
                                );
                              }}
                              className="text-purple-600 hover:text-purple-800 cursor-pointer capitalize"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          )}
                        </span>
                      ))}
                    </div>
                    {isEditing && (
                      <input
                        type="text"
                        placeholder="Add a target company and press Enter"
                        className="w-full !px-3 !py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        onKeyPress={(e) => {
                          if (e.key === "Enter" && e.target.value.trim()) {
                            handleProfesssionalInputChange("targetCompanies", [
                              ...profileProfessionalData.targetCompanies,
                              e.target.value.trim(),
                            ]);
                            e.target.value = "";
                          }
                        }}
                      />
                    )}
                  </div>
                </div>
              )}

              {/* Preferences */}
              {/* {activeSection === "preferences" && (
                <div className="!p-6 !space-y-6 text-gray-700">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 !mb-2">Theme</label>
                      <select
                        value={preferences.theme}
                        onChange={(e) => handlePreferenceChange('theme', e.target.value)}
                        className="w-full !px-3 !py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      >
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                        <option value="auto">Auto</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 !mb-2">
                        Timezone
                      </label>
                      <select
                        value={preferences.timezone}
                        onChange={(e) =>
                          handlePreferenceChange("timezone", e.target.value)
                        }
                        className="w-full !px-3 !py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500  cursor-pointer"
                      >
                        <option value="Asia/Kolkata">
                          India Standard Time (IST)
                        </option>
                        <option value="America/New_York">
                          Eastern Time (EST)
                        </option>
                        <option value="America/Los_Angeles">
                          Pacific Time (PST)
                        </option>
                        <option value="Europe/London">
                          Greenwich Mean Time (GMT)
                        </option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 !mb-2">
                        Language
                      </label>
                      <select
                        value={preferences.language}
                        onChange={(e) =>
                          handlePreferenceChange("language", e.target.value)
                        }
                        className="w-full !px-3 !py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 cursor-pointer"
                      >
                        <option value="en">English</option>
                        <option value="hi">Hindi</option>
                        <option value="mr">Marathi</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 !mb-2">
                        AI Voice Speed
                      </label>
                      <select
                        value={preferences.voiceSpeed}
                        onChange={(e) =>
                          handlePreferenceChange("voiceSpeed", e.target.value)
                        }
                        className="w-full !px-3 !py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 cursor-pointer"
                      >
                        <option value="slow">Slow</option>
                        <option value="normal">Normal</option>
                        <option value="fast">Fast</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 !mb-2">
                        Feedback Detail Level
                      </label>
                      <select
                        value={preferences.feedbackDetail}
                        onChange={(e) =>
                          handlePreferenceChange(
                            "feedbackDetail",
                            e.target.value
                          )
                        }
                        className="w-full !px-3 !py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 cursor-pointer"
                      >
                        <option value="brief">Brief</option>
                        <option value="detailed">Detailed</option>
                        <option value="comprehensive">Comprehensive</option>
                      </select>
                    </div>
                  </div>
                </div>
              )} */}

              {/* Notifications */}
              {activeSection === "notifications" && (
                <div className="!p-6 !space-y-6">
                  <div className="!space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">
                          Email Notifications
                        </h4>
                        <p className="text-sm text-gray-500">
                          Receive updates via email
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          handlePreferenceChange(
                            "emailNotifications",
                            !preferences.emailNotifications
                          )
                        }
                        className={`cursor-pointer relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          preferences.emailNotifications
                            ? "bg-indigo-600"
                            : "bg-gray-200"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            preferences.emailNotifications
                              ? "translate-x-6"
                              : "translate-x-1"
                          }`}
                        />
                      </button>
                    </div>

                    {/* <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">
                          Push Notifications
                        </h4>
                        <p className="text-sm text-gray-500">
                          Receive browser notifications
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          handlePreferenceChange(
                            "pushNotifications",
                            !preferences.pushNotifications
                          )
                        }
                        className={`cursor-pointer relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          preferences.pushNotifications
                            ? "bg-indigo-600"
                            : "bg-gray-200"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            preferences.pushNotifications
                              ? "translate-x-6"
                              : "translate-x-1"
                          }`}
                        />
                      </button>
                    </div> */}

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">
                          Weekly Progress Reports
                        </h4>
                        <p className="text-sm text-gray-500">
                          Get weekly summaries of your progress
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          handlePreferenceChange(
                            "weeklyReports",
                            !preferences.weeklyReports
                          )
                        }
                        className={`cursor-pointer relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          preferences.weeklyReports
                            ? "bg-indigo-600"
                            : "bg-gray-200"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            preferences.weeklyReports
                              ? "translate-x-6"
                              : "translate-x-1"
                          }`}
                        />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">
                          Practice Reminders
                        </h4>
                        <p className="text-sm text-gray-500">
                          Daily reminders to keep your streak going
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          handlePreferenceChange(
                            "practiceReminders",
                            !preferences.practiceReminders
                          )
                        }
                        className={`cursor-pointer relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          preferences.practiceReminders
                            ? "bg-indigo-600"
                            : "bg-gray-200"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            preferences.practiceReminders
                              ? "translate-x-6"
                              : "translate-x-1"
                          }`}
                        />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">
                          Marketing Emails
                        </h4>
                        <p className="text-sm text-gray-500">
                          Receive updates about new features and tips
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          handlePreferenceChange(
                            "marketingEmails",
                            !preferences.marketingEmails
                          )
                        }
                        className={`cursor-pointer relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          preferences.marketingEmails
                            ? "bg-indigo-600"
                            : "bg-gray-200"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            preferences.marketingEmails
                              ? "translate-x-6"
                              : "translate-x-1"
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Privacy & Security */}
              {activeSection === "privacy" && (
                <div className="!p-6 !space-y-6 text-gray-600">
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg !p-4">
                    <div className="flex">
                      <AlertCircle className="w-5 h-5 text-yellow-600 !mt-0.5 !mr-3" />
                      <div>
                        <h4 className="text-sm font-medium text-yellow-800">
                          Account Security
                        </h4>
                        <p className="text-sm text-yellow-700 !mt-1">
                          Keep your account secure with these settings
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="!space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 !mb-2">
                        Current Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter current password"
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          disabled={isNotLocalLogin}
                          className={`w-full !px-3 !py-2 !pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                            isNotLocalLogin
                              ? "cursor-not-allowed "
                              : "cursor-pointer"
                          }`}
                        />
                        <button
                          type="button"
                          disabled={isNotLocalLogin}
                          onClick={() => setShowPassword(!showPassword)}
                          className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400  ${
                            isNotLocalLogin
                              ? "cursor-not-allowed "
                              : "cursor-pointer hover:text-gray-600"
                          }`}
                        >
                          {showPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 !mb-2">
                          New Password
                        </label>
                        <input
                          type="password"
                          placeholder="Enter new password"
                          disabled={isNotLocalLogin}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className={`w-full !px-3 !py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                            isNotLocalLogin
                              ? "cursor-not-allowed "
                              : "cursor-pointer"
                          }`}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 !mb-2">
                          Confirm Password
                        </label>
                        <input
                          type="password"
                          placeholder="Confirm new password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className={`w-full !px-3 !py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                            isNotLocalLogin
                              ? "cursor-not-allowed "
                              : "cursor-pointer"
                          }`}
                          disabled={isNotLocalLogin}
                        />
                      </div>
                    </div>

                    <button
                      className={`!px-4 !py-2  text-white rounded-lg  transition-colors ${
                        isNotLocalLogin
                          ? "cursor-not-allowed bg-gray-300"
                          : "cursor-pointer bg-indigo-600 hover:bg-indigo-700"
                      }`}
                      disabled={isNotLocalLogin}
                      onClick={(e) => handelUpdatePassword(e)}
                    >
                      Update Password
                    </button>
                  </div>

                  <div className="border-t border-gray-200 !pt-6">
                    <h4 className="text-sm font-medium text-gray-900 !mb-4">
                      Deactivate Account
                    </h4>
                    <div className="!space-y-3">
                      {/* <button className="flex items-center !space-x-3 text-sm text-gray-700 hover:text-gray-900 transition-colors">
                        <Download className="w-4 h-4" />
                        <span>Download your data</span>
                      </button> */}
                      <button
                        className="flex items-center !space-x-3 text-sm text-red-600 hover:text-red-800 transition-colors cursor-pointer"
                        onClick={() => setIsDeleteModalOpen((prev) => !prev)}
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Delete account</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Achievements */}
              {activeSection === "achievements" && (
                <div className="!p-6 !space-y-6">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-gray-900 !mb-2">
                      Your Achievements
                    </h3>
                    <p className="text-gray-600">
                      Track your progress and unlock new milestones
                    </p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    {achievements.map((achievement, index) => (
                      <div
                        key={index}
                        className={`!p-6 rounded-xl border-2 transition-all ${
                          achievement.earned
                            ? "bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 shadow-sm"
                            : "bg-gray-50 border-gray-200"
                        }`}
                      >
                        <div className="flex items-start !space-x-4">
                          <div
                            className={`text-3xl ${
                              achievement.earned ? "" : "grayscale opacity-50"
                            }`}
                          >
                            {achievement.icon}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center !space-x-2 !mb-2">
                              <h4
                                className={`font-medium ${
                                  achievement.earned
                                    ? "text-green-900"
                                    : "text-gray-700"
                                }`}
                              >
                                {achievement.title}
                              </h4>
                              {achievement.earned && (
                                <CheckCircle className="w-4 h-4 text-green-600" />
                              )}
                            </div>
                            <p
                              className={`text-sm ${
                                achievement.earned
                                  ? "text-green-700"
                                  : "text-gray-600"
                              }`}
                            >
                              {achievement.description}
                            </p>
                            {achievement.earned && achievement.date && (
                              <p className="text-xs text-green-600 !mt-2">
                                Earned on{" "}
                                {new Date(
                                  achievement.date
                                ).toLocaleDateString()}
                              </p>
                            )}
                            {!achievement.earned && achievement.progress && (
                              <div className="!mt-3">
                                <div className="flex items-center justify-between text-xs text-gray-600 !mb-1">
                                  <span>Progress</span>
                                  <span>{achievement.progress}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div
                                    className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                                    style={{
                                      width: `${achievement.progress}%`,
                                    }}
                                  ></div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-indigo-50 border border-indigo-200 rounded-lg !p-6 text-center">
                    <Star className="w-8 h-8 text-indigo-600 !mx-auto !mb-3" />
                    <h4 className="font-medium text-indigo-900 !mb-2">
                      Keep Going!
                    </h4>
                    <p className="text-sm text-indigo-700">
                      You're making great progress. Complete more practice
                      sessions to unlock new achievements!
                    </p>
                  </div>
                </div>
              )}

              {/* Overview */}
              {activeSection === "overview" && (
                <div className="!p-4 !space-y-5">
                  <QuickStats userStats={userStats} />
                  <RecentActivity recentSessions={recentSessions} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <ProfileModal
          currentPhoto={currentPhoto}
          setCurrentPhoto={setCurrentPhoto}
          setIsModalOpen={setIsModalOpen}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteAccountModal setIsDeleteModalOpen={setIsDeleteModalOpen} />
      )}
    </div>
  );
}
