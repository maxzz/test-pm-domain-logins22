import { IconGithubLogo } from '../UI/UIIcons';

export function IconSiteLink({ link, label, title }: { link: string; label: string; title: string; }) {
    return (
        <a
            className="w-[18px] h-[18px] text-xs text-yellow-100 border-yellow-100 opacity-30 border rounded-full flex items-center justify-center"
            href={link} target="_blank" title={title}
        >
            {label}
        </a>
    );
}

export function Section6_Footer() {
    return (
        <div className="px-2 py-2 flex items-center justify-between bg-[#003165]">
            <a href="https://github.com/maxzz/test-pm-domain-logins22" target="_blank">
                <IconGithubLogo className="w-5 h-5 fill-[#004997] stroke-[14] stroke-yellow-300" />
            </a>
            <div className="flex items-center space-x-1">
                <IconSiteLink link="https://maxzz.github.io/test-pm" label="1" title="5 logins" />
                <IconSiteLink link="https://maxzz.github.io/test-pm-second" label="2" title="ghost" />
                <IconSiteLink link="https://maxzz.github.io/test-pm-domain-logins" label="3" title="domain A/B tests" />
            </div>
        </div>
    );
}

//TODO: popup with image preview
