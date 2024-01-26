import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@convoform/ui/components/ui/card";

import { cn } from "@/lib/utils";
import { SectionCard } from "./sectionCard";

export function Features() {
  return (
    <SectionCard stickyHeader title="Features" headerClassName="bg-gray-50/60">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <FeatureListItem
          title="Easy to use"
          description="The form builder is simple to use, even for those who are not technical."
          className="rounded-3xl md:rounded-none md:rounded-tl-3xl"
        />
        <FeatureListItem
          title="Conversational"
          description="The forms are conversational, which makes them more engaging and easier to complete."
          className="rounded-3xl md:rounded-none md:rounded-tr-3xl"
        />
        <FeatureListItem
          title="Responsive"
          description="The forms are responsive, so they can be used on any device."
          className="rounded-3xl md:rounded-none md:rounded-bl-3xl"
        />
        <FeatureListItem
          title="Secure"
          description="The forms are secure, so you can be confident that your data is safe."
          className="rounded-3xl md:rounded-none md:rounded-br-3xl"
        />
      </div>
    </SectionCard>
  );
}

const FeatureListItem = ({
  title,
  description,
  className,
}: {
  title: string;
  description: string;
  className?: string;
}) => (
  <Card
    className={cn(
      "h-full w-full rounded-none p-2 shadow-inner lg:p-5",
      className,
    )}
  >
    <CardHeader>
      <CardTitle className="text-left text-2xl font-normal leading-none tracking-tight lg:text-center">
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-left">{description}</p>
    </CardContent>
  </Card>
);