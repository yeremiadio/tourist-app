import { ArrowLeftIcon } from "@heroicons/react/solid";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Buttons/Button";
import Layout from "../../components/Layouts/Layout";
import { useAppSelector } from "../../redux/hooks";

type Props = {};

const ProfilePage = (props: Props) => {
  const { name, email, avatar } = useAppSelector((state) => state.auth.user);
  const navigate = useNavigate();
  return (
    <Layout>
      <div className="pb-6">
        <Button
          bgColor="gray-800"
          variants="ghost"
          className="gap-3"
          type="button"
          onClick={() => navigate(-1)}
        >
          <ArrowLeftIcon className="w-4 h-4" />
          Back
        </Button>
      </div>
      <section className="p-4 md:px-12 min-h-screen w-full">
        <div className="grid grid-cols-1 place-items-center overflow-hidden">
          <div className="flex flex-1 items-center gap-2">
            <div className="relative">
              <img
                src={avatar}
                alt={name}
                className="rounded-full w-36 h-36 object-cover border border-gray-200"
              />
            </div>
          </div>
          <div className="text-center space-y-1 mt-4">
            <h3 className="text-black-secondary font-bold text-3xl">{name}</h3>
            <p className="text-base break-all break-words text-black-secondary text-opacity-60">
              {email}
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProfilePage;
