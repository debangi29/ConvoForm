"use client";

import { useOrganization, UserButton } from "@clerk/nextjs";
import { Button } from "@convoform/ui/components/ui/button";
import { Skeleton } from "@convoform/ui/components/ui/skeleton";
import { ChevronLeft, ChevronRight, Home } from "lucide-react";

import { montserrat } from "@/app/fonts";
import { LinkN } from "@/components/common/linkN";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import ChangeNameInput from "./changeNameInput";

type Props = {
  formId: string;
};

function FormPageHeader({ formId }: Readonly<Props>) {
  const { organization, isLoaded } = useOrganization();
  const { data, isLoading } = api.form.getOneWithWorkspace.useQuery({
    id: formId,
  });

  if (isLoading || !isLoaded) {
    return <FormEditorPageHeaderSkeleton />;
  }

  if (!data || !organization || data.organizationId !== organization.id) {
    return null;
  }

  return (
    <div className="sticky top-0 z-50 border-b bg-white/70 p-3 backdrop-blur">
      <div className="flex items-center justify-between ">
        <div
          className={cn(
            "flex w-full items-center overflow-hidden text-xs max-lg:hidden",
            montserrat.className,
          )}
        >
          <Button size="sm" variant="link" asChild>
            <LinkN href={"/dashboard"}>
              <Home size={20} />
            </LinkN>
          </Button>
          <ChevronRight size={20} />
          <LinkN href={"/dashboard"}>
            <Button size="sm" variant="link">
              Dashboard
            </Button>
          </LinkN>
          <ChevronRight size={20} />
          {data ? (
            <>
              <LinkN href={`/workspaces/${data.workspaceId}`}>
                <Button size="sm" variant="link">
                  {data.workspace.name}
                </Button>
              </LinkN>
              <ChevronRight size={20} />
              <ChangeNameInput
                form={data}
                className="w-full text-lg font-medium"
              />
            </>
          ) : (
            <span>Form not found</span>
          )}
        </div>
        <div className="lg:hidden">
          <LinkN href={data ? `/workspaces/${data.workspaceId}` : "/dashboard"}>
            <Button size="sm" variant="link" className="px-0 text-sm">
              <ChevronLeft className="mr-2" size={20} />
              Back
            </Button>
          </LinkN>
        </div>
        <div className="overflow-hidden lg:hidden">
          {data ? (
            <ChangeNameInput form={data} className="text-xl font-medium" />
          ) : (
            <span>Form not found</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <UserButton />
        </div>
      </div>
    </div>
  );
}

const FormEditorPageHeaderSkeleton = () => {
  return (
    <div className="border-border/40 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10 flex items-center justify-between border-b bg-white p-3 backdrop-blur">
      <div className="flex items-center ">
        <Skeleton className="mr-2 h-5 w-5" />
        <Skeleton className="mr-2 h-5 w-12" />
        <Skeleton className="mr-2 h-5 w-12" />
        <Skeleton className="mr-2 h-5 w-20" />
      </div>
      <div className="flex items-center gap-2">
        <Skeleton className="h-10 w-10 animate-pulse rounded-full" />
      </div>
    </div>
  );
};

FormPageHeader.Skeleton = FormEditorPageHeaderSkeleton;

export { FormPageHeader as FormEditorPageHeader };
