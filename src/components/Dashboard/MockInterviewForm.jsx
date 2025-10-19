import { useEffect, useState } from "react";
import { Dropdown } from "../General/Dropdown";
import { Brain, Building2, Loader2, Mic } from "lucide-react";
import {
  companies,
  difficultyLevels,
  experienceLevels,
  roles,
  skills as skillOptions,
} from "../../constants";
import { createMockInterview } from "../../services/apis/mockInterviewApi";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import ErrorPage from "../../pages/ErrorPage";
const mockCategories = [
  {
    id: 1,
    value: "companyspecific",
    label: "Company Specific",
    icon: <Building2 className="h-4 w-4" />,
  },
  {
    id: 2,
    value: "skillbased",
    label: "Skill Based",
    icon: <Brain className="h-4 w-4" />,
  },
];

export const MockInterviewForm = () => {
  const navigate = useNavigate();
  const [mockCategory, setMockCategory] = useState(null);
  const [companyName, setCompanyName] = useState(null);
  const [role, setRole] = useState(null);
  const [experienceLevel, setExperienceLevel] = useState(null);
  const [difficultyLevel, setDifficultyLevel] = useState(null);
  const [skills, setSkills] = useState([]);
  const [hasErrorField, setHasErrorField] = useState(false);
  const [errorFields, setErrorFields] = useState({});

  // const [intructions, setIntructions] = useState("");
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (formData) =>
      createMockInterview(formData.mockCategory, formData),

    onSuccess: (response) => {
      navigate(`/interview?interviewId=${response?.data?.id}`);
    },
    onError: (error) => {
      console.log("Error in creating test", error);
      toast.error(error?.message);
    },
  });

  const handleCheckFieldsCompanySpecific = () => {
    const errorObj = {};
    if (!mockCategory) {
      errorObj.mockCategory = "Please, select the type of interview.";
    }
    if (!companyName) {
      errorObj.companyName = "Please, select a company.";
    }
    if (!experienceLevel) {
      errorObj.experienceLevel = "Please, select an experience level.";
    }
    if (!role) {
      errorObj.role = "Please, select a role.";
    }
    return errorObj;
  };

  const handleCheckFieldsSkillsBased = () => {
    const errorObj = {};
    if (!mockCategory) {
      errorObj.mockCategory = "Please, select the type of interview.";
    }
    if (!difficultyLevel) {
      errorObj.difficultyLevel = "Please, select a difficulty level.";
    }
    if (!skills || skills?.length === 0) {
      errorObj.skills = "Please, select at least one skill.";
    }
    if (!experienceLevel) {
      errorObj.experienceLevel = "Please, select an experience level.";
    }
    return errorObj;
  };

  const handleOnClick = (e) => {
    e.preventDefault();

    let currentErrors = {};

    if (mockCategory?.value === "companyspecific") {
      currentErrors = handleCheckFieldsCompanySpecific();
    } else {
      currentErrors = handleCheckFieldsSkillsBased();
    }

    setErrorFields(currentErrors);

    if (Object.keys(currentErrors).length > 0) {
      setHasErrorField(true);
      return;
    }
    const formData = {
      mockCategory: mockCategory?.value,
      experienceLevel: experienceLevel?.value,
    };

    if (mockCategory?.value === "companyspecific") {
      formData.companyName = companyName?.value;
      formData.role = role?.value;
    } else {
      formData.difficulty = difficultyLevel;
      formData.skills = [...skills.map((section) => section?.value)];
    }
    setHasErrorField(false);
    console.log(formData);
    mutate(formData);
  };

  useEffect(() => {
    if (mockCategory?.value === "companyspecific") {
      const errors = handleCheckFieldsCompanySpecific();
      setErrorFields(errors);
    }
  }, [mockCategory, companyName, role, experienceLevel]);

  useEffect(() => {
    if (mockCategory?.value === "skillbased") {
      const errors = handleCheckFieldsSkillsBased();
      setErrorFields(errors);
    }
  }, [mockCategory, difficultyLevel, skills, experienceLevel]);

  useEffect(() => {
    setCompanyName(null);
    setRole(null);
    setSkills([]);
    setDifficultyLevel(null);
    setExperienceLevel(null);
    setErrorFields({});
    setHasErrorField(false);
  }, [mockCategory]);

  if (isError) {
    return <ErrorPage error={error.message} />;
  }
  return (
    <div className="!space-y-6">
      <div className="bg-white !p-6 rounded-xl shadow-sm border border-gray-200 !space-y-6">
        <h3 className="text-lg font-semibold text-gray-900 !mb-6">
          Start New Mock Practice Session
        </h3>
        <div className="flex">
          <Dropdown
            label="Mock Category"
            options={mockCategories}
            value={mockCategory}
            onChange={setMockCategory}
            placeholder="select interview type"
            required
            error={
              hasErrorField && errorFields.hasOwnProperty("mockCategory")
                ? errorFields.mockCategory
                : null
            }
          />
        </div>
        <div className="grid md:grid-cols-2 !gap-6">
          {mockCategory?.id !== 2 ? (
            <>
              <Dropdown
                label="Choose Company"
                options={companies}
                value={companyName}
                onChange={setCompanyName}
                placeholder="select company"
                required
                searchable
                error={
                  hasErrorField && errorFields.hasOwnProperty("companyName")
                    ? errorFields.companyName
                    : null
                }
              />
              <Dropdown
                label="Select Role"
                options={roles}
                value={role}
                onChange={setRole}
                placeholder="select role"
                required
                error={
                  hasErrorField && errorFields.hasOwnProperty("role")
                    ? errorFields.role
                    : null
                }
              />
            </>
          ) : (
            <>
              <Dropdown
                label="Select Skills"
                options={skillOptions}
                value={skills}
                onChange={setSkills}
                placeholder="select skills..."
                multiple
                searchable
                clearable
                required
                helperText="You can select multiple skills"
                variant="filled"
                error={
                  hasErrorField && errorFields.hasOwnProperty("skills")
                    ? errorFields.skills
                    : null
                }
              />
              <Dropdown
                label="Difficulty Level"
                options={difficultyLevels}
                value={difficultyLevel}
                onChange={setDifficultyLevel}
                placeholder="select difficulty level"
                required
                error={
                  hasErrorField && errorFields.hasOwnProperty("difficultyLevel")
                    ? errorFields.difficultyLevel
                    : null
                }
              />
              {/* <div className="flex flex-col row-span-2">
                <label
                  htmlFor="user-intructions"
                  className="font-medium text-sm text-gray-700 !mb-1.5"
                >
                  Special Intructions
                </label>
                <textarea
                  id="user-intructions"
                  value={intructions}
                  onChange={(e)=>setIntructions(e.target.value)}
                  placeholder="enter your instructions..."
                  className="h-full text-sm !p-3 border text-gray-600 border-gray-400 rounded-xl"
                />
              </div> */}
            </>
          )}
          <Dropdown
            label="Experience Level"
            options={experienceLevels}
            value={experienceLevel}
            onChange={setExperienceLevel}
            placeholder="select experience level"
            required
            error={
              hasErrorField && errorFields.hasOwnProperty("experienceLevel")
                ? errorFields.experienceLevel
                : null
            }
          />
        </div>

        <div className="!mt-6 flex justify-center">
          <button
            className={`flex items-center !space-x-3 !px-8 !py-3 ${
              isPending
                ? "bg-gray-700 cursor-progress"
                : "bg-gradient-to-r  from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 cursor-pointer hover:scale-102"
            } text-white rounded-lg  transition-all duration-300 shadow-lg `}
            onClick={(e) => handleOnClick(e)}
            disabled={isPending}
          >
            {isPending ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Mic className="w-5 h-5" />
            )}
            <span className="font-medium">{`${
              isPending ? "Creating..." : "Start Interview"
            }`}</span>
          </button>
        </div>
      </div>
      <div className="w-full h-24"></div>
    </div>
  );
};
