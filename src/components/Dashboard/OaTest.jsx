import { Building2, Loader2, PlayIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Dropdown } from "../General/Dropdown";
import {
  companies,
  difficultyLevels,
  experienceLevels,
  roles,
  testSections,
} from "../../constants";
import { PiExam } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { createOaTest } from "../../services/apis/oaTestApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import ErrorPage from "../../pages/ErrorPage";
const oaType = [
  {
    id: 1,
    value: "companyspecific",
    label: "Company Specific",
    icon: <Building2 className="h-4 w-4" />,
  },
  {
    id: 2,
    value: "practice",
    label: "Practice",
    icon: <PlayIcon className="h-4 w-4" />,
  },
];

export const OaTest = () => {
  const navigate = useNavigate();
  const [selectOAType, setSelectOAType] = useState(null);
  const [selectCompany, setSelectCompany] = useState(null);
  const [selectRole, setSelectRole] = useState(null);
  const [selectExperienceLevel, setSelectExperienceLevel] = useState(null);
  const [selectDifficultyLevel, setSelectDifficultyLevel] = useState(null);
  const [instructions, setInstructions] = useState("");
  const [selectTestSections, setSelectTestSections] = useState([]);
  const [hasErrorField, setHasErrorField] = useState(false);
  const [errorFields, setErrorFields] = useState({});

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (formData) => createOaTest(formData, formData.testCategory),

    onSuccess: (response) => {
      toast.success(response?.data?.message);
      navigate(`/test?testid=${response?.data?.testID}`);
    },
    onError: (error) => {
      console.log("Error in creating test", error);
      toast.error(error?.message);
    },
  });

  const handleOnClick = async (e) => {
    e.preventDefault();

    let currentErrors = {};

    if (selectOAType?.value === "companyspecific") {
      currentErrors = handleCheckFieldsCompanySpecific();
    } else {
      currentErrors = handleCheckFieldsPraticeTest();
    }
    setErrorFields(currentErrors);

    if (Object.keys(currentErrors).length > 0) {
      setHasErrorField(true);
      return;
    }
    const formData = {
      testCategory: selectOAType?.value,
    };

    if (selectOAType?.value === "companyspecific") {
      formData.companyName = selectCompany?.value;
      formData.role = selectRole?.value;
      formData.experienceLevel = selectExperienceLevel?.value;
    } else {
      formData.difficulty = selectDifficultyLevel;
      formData.userSelectedSections = [
        ...selectTestSections.map((section) => section?.value),
      ];
      formData.specialInstructions = instructions;
    }
    setHasErrorField(false);
    console.log(formData);
    mutate(formData);
  };

  const handleCheckFieldsCompanySpecific = () => {
    const errorObj = {};
    if (!selectOAType) {
      errorObj.selectOAType = "Please, select the type of test.";
    }
    if (!selectCompany) {
      errorObj.selectCompany = "Please, select a company.";
    }
    if (!selectExperienceLevel) {
      errorObj.selectExperienceLevel = "Please, select an experience level.";
    }
    if (!selectRole) {
      errorObj.selectRole = "Please, select a role.";
    }
    return errorObj;
  };

  const handleCheckFieldsPraticeTest = () => {
    const errorObj = {};
    if (!selectOAType) {
      errorObj.selectOAType = "Please, select the type of test.";
    }
    if (!selectDifficultyLevel) {
      errorObj.selectDifficultyLevel = "Please, select a difficulty level.";
    }
    if (!selectTestSections || selectTestSections?.length === 0) {
      errorObj.selectTestSections = "Please, select at least one section.";
    }
    if (selectTestSections.length > 4) {
      errorObj.selectTestSections = "You can select at most 4 sections.";
    }
    return errorObj;
  };

  useEffect(() => {
    if (selectOAType?.value === "companyspecific") {
      const errors = handleCheckFieldsCompanySpecific();
      setErrorFields(errors);
    }
  }, [selectOAType, selectCompany, selectRole, selectExperienceLevel]);

  useEffect(() => {
    if (selectOAType?.value === "practice") {
      const errors = handleCheckFieldsPraticeTest();
      setErrorFields(errors);
    }
  }, [selectOAType, selectDifficultyLevel, selectTestSections]);

  useEffect(() => {
    setSelectCompany(null);
    setSelectDifficultyLevel(null);
    setSelectExperienceLevel(null);
    setSelectRole(null);
    setSelectTestSections([]);
    setInstructions("");
    setErrorFields({});
    setHasErrorField(false);
  }, [selectOAType]);

  if (isError) {
    toast.error(error.message) ;
  }
  return (
    <div className="!space-y-6">
      {/* Session Setup */}
      <div className="bg-white !p-6 rounded-xl shadow-sm border border-gray-200 !space-y-6">
        <h3 className="text-lg font-semibold text-gray-900 !mb-6">
          Start New OA Practice Session
        </h3>
        <div className="flex">
          <Dropdown
            label="OA Category"
            options={oaType}
            value={selectOAType}
            onChange={setSelectOAType}
            placeholder="select type of online assessment"
            required
            disabled={isPending}
            error={
              hasErrorField && errorFields.hasOwnProperty("selectOAType")
                ? errorFields.selectOAType
                : null
            }
          />
        </div>
        <div className="grid md:grid-cols-2 !gap-6">
          {selectOAType?.id !== 2 ? (
            <>
              <Dropdown
                label="Choose Company"
                options={companies}
                value={selectCompany}
                onChange={setSelectCompany}
                placeholder="choose company"
                searchable
                required
                disabled={isPending}
                variant="filled"
                error={
                  hasErrorField &&
                  errorFields.hasOwnProperty("selectCompany") &&
                  errorFields.selectCompany
                }
              />
              <Dropdown
                label="Select Role"
                options={roles}
                value={selectRole}
                onChange={setSelectRole}
                placeholder="select role"
                required
                disabled={isPending}
                error={
                  hasErrorField && errorFields.hasOwnProperty("selectRole")
                    ? errorFields.selectRole
                    : null
                }
              />
              <Dropdown
                label="Experience Level"
                options={experienceLevels}
                value={selectExperienceLevel}
                onChange={setSelectExperienceLevel}
                placeholder="select experience level"
                required
                disabled={isPending}
                error={
                  hasErrorField &&
                  errorFields.hasOwnProperty("selectExperienceLevel")
                    ? errorFields.selectExperienceLevel
                    : null
                }
              />
            </>
          ) : (
            <>
              <Dropdown
                label="Difficulty Level"
                options={difficultyLevels}
                value={selectDifficultyLevel}
                onChange={setSelectDifficultyLevel}
                placeholder="select difficulty level"
                required
                disabled={isPending}
                error={
                  hasErrorField &&
                  errorFields.hasOwnProperty("selectDifficultyLevel")
                    ? errorFields.selectDifficultyLevel
                    : null
                }
              />
              <Dropdown
                disabled={isPending}
                label="Select Test Sections"
                options={testSections}
                value={selectTestSections}
                onChange={setSelectTestSections}
                placeholder="select sections"
                multiple
                clearable
                helperText={"You can select multiple sections(MAX-4)"}
                required
                error={
                  hasErrorField &&
                  errorFields.hasOwnProperty("selectTestSections")
                    ? errorFields.selectTestSections
                    : null
                }
              />

              <div className="flex flex-col">
                <label
                  htmlFor="user-instructions"
                  className="font-medium text-sm text-gray-700 !mb-1.5"
                >
                  Special Instructions
                </label>
                <textarea
                  disabled={isPending}
                  id="user-instructions"
                  placeholder="enter your instructions..."
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  className="h-full text-sm !p-3 border text-gray-600 border-gray-400 rounded-xl"
                />
              </div>
            </>
          )}
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
              <PiExam className="w-5 h-5" />
            )}
            <span className="font-medium">{`${
              isPending ? "Creating..." : "Start Online Assessment"
            }`}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
