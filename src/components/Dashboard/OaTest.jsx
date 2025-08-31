import { Building2, PlayIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Dropdown } from "../General/Dropdown";
import {
  companies,
  difficultyLevels,
  experienceLevels,
  programmingLanguages,
  roles,
  testSections,
} from "../../constants";
import { PiExam } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { createOaTest } from "../../services/apis/oaTestApi";
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
  const navigate=useNavigate();
  const [selectOAType, setSelectOAType] = useState(null);
  const [selectCompany, setSelectCompany] = useState(null);
  const [selectRole, setSelectRole] = useState(null);
  const [selectExperienceLevel, setSelectExperienceLevel] = useState(null);
  const [selectDifficultyLevel, setSelectDifficultyLevel] = useState(null);
  const [instructions, setInstructions] = useState("");
  const [selectTestSections, setSelectTestSections] = useState([]);
  const [
    selectPreferredProgrammingLanguages,
    setSelectPreferredProgrammingLanguages,
  ] = useState([]);

  const handleOnClick = async(e) => {
    e.preventDefault();

    const formData = {
      oaCategory: selectOAType?.value,
      role: selectRole?.value,
      experienceLevel: selectExperienceLevel?.value,
      selectedSections: [
        ...selectTestSections.map((section) => section?.value),
      ],
      preferredProgrammingLanguages: [
        ...selectPreferredProgrammingLanguages.map(
          (language) => language?.value
        ),
      ],
      instructions: instructions,
    };

    if (selectOAType?.value === "companyspecific") {
      formData.company = selectCompany?.value;
    } else {
      formData.difficultyLevel = selectDifficultyLevel?.value;
    }
    console.log("FORM DATA ::: ", formData)
    await createOaTest(formData,navigate,formData?.oaCategory);
  };

  useEffect(() => {
    setSelectCompany(null);
    setSelectDifficultyLevel(null);
    setSelectExperienceLevel(null);
    setSelectRole(null);
    setSelectTestSections([]);
    setInstructions("");
    setSelectPreferredProgrammingLanguages([]);
  }, [selectOAType]);

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
          />
        </div>
        <div className="grid md:grid-cols-2 !gap-6">
          {selectOAType?.id !== 2 ? (
            <Dropdown
              label="Choose Company"
              options={companies}
              value={selectCompany}
              onChange={setSelectCompany}
              placeholder="choose company"
              searchable
              required
              variant="filled"
            />
          ) : (
            <Dropdown
              label="Difficulty Level"
              options={difficultyLevels}
              value={selectDifficultyLevel}
              onChange={setSelectDifficultyLevel}
              placeholder="select difficulty level"
              required
            />
          )}
          <Dropdown
            label="Select Role"
            options={roles}
            value={selectRole}
            onChange={setSelectRole}
            placeholder="select role"
            required
          />
          <Dropdown
            label="Experience Level"
            options={experienceLevels}
            value={selectExperienceLevel}
            onChange={setSelectExperienceLevel}
            placeholder="select experience level"
            required
          />
          <Dropdown
            label="Select Preferred Languages"
            options={programmingLanguages}
            value={selectPreferredProgrammingLanguages}
            onChange={setSelectPreferredProgrammingLanguages}
            placeholder="select programming languages..."
            multiple
            clearable
            helperText={"You can select max 4 languages"}
            required
          />
          <Dropdown
            label="Select Test Sections"
            options={testSections}
            value={selectTestSections}
            onChange={setSelectTestSections}
            placeholder="select sections"
            multiple
            clearable
            helperText={"You can select multiple sections"}
          />

          <div className="flex flex-col">
            <label
              htmlFor="user-instructions"
              className="font-medium text-sm text-gray-700 !mb-1.5"
            >
              Special Instructions
            </label>
            <textarea
              id="user-instructions"
              placeholder="enter your instructions..."
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              className="h-full text-sm !p-3 border text-gray-600 border-gray-400 rounded-xl"
            />
          </div>
        </div>

        <div className="!mt-6 flex justify-center">
          <button
            className="flex items-center !space-x-3 !px-8 !py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 hover:scale-105 shadow-lg cursor-pointer"
            onClick={(e) => handleOnClick(e)}
          >
            {<PiExam className="w-5 h-5" />}
            <span className="font-medium">{"Start Online Assessment"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
