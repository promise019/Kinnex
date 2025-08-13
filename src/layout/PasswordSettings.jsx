import passkey from '../assets/icon/passkey.svg'

export default function PasswordSettings() {
    return (
        <section className="rounded-tr-xl w-full bg-white shadow p-2 space-y-2 space-x-2">
            <h1 className='font-bold'>Passsword Settings</h1>
            <img src={passkey} className="w-6 inline-block" />
            <span>
                Change Password
            </span>
        </section>
    )
}