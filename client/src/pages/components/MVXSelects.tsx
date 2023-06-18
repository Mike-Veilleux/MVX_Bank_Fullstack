import { IAccountType } from "../../interfaces/ENUMS";
import { useAccount, useAccount_API } from "../../stores/useAccountsStore";
import { useUser } from "../../stores/useUserStore";

export const DropboxAccount = () => {
  const account = useAccount();
  const account_API = useAccount_API();
  const user = useUser();

  function onChangeSelectedAccount(e: any) {
    account_API.FetchAndSetActiveAccount(user!._id!, e.target.value);
  }

  return (
    <select
      className="form-select"
      aria-label="Default select example"
      onChange={(e) => onChangeSelectedAccount(e)}
      value={
        account?.accountType === IAccountType.SAVINGS
          ? `${IAccountType.SAVINGS}`
          : `${IAccountType.CHECK}`
      }
    >
      <option
        // selected={account?.accountType === IAccountType.SAVINGS ? true : false}
        value={`${IAccountType.SAVINGS}`}
      >
        {IAccountType.SAVINGS}
      </option>
      <option
        // selected={account?.accountType === IAccountType.CHECK ? true : false}
        value={`${IAccountType.CHECK}`}
      >
        {IAccountType.CHECK}
      </option>
    </select>
  );
};
