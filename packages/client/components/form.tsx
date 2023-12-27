"use client";

import type { FormInputs } from "@/lib/types";
import Link from "next/link";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { EXPIRE, SITE_URL } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Button from "./button";
import Dialog from "./dialog";
import Editor from "./editor";
import Spinner from "./spinner";

const Form = () => {
  const [gistRes, setGistRes] = useState({ id: "", expiration: -1 });
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    watch,
    reset,
    formState: { isSubmitting, isSubmitSuccessful, errors },
  } = useForm<FormInputs>({
    shouldUseNativeValidation: true,
    defaultValues: {
      expiration: EXPIRE.ONE_WEEK,
      text: "",
    },
  });
  const siteURL = new URL(SITE_URL);
  const shouldPrefetchGistResponse = gistRes.expiration > 0;

  // register editor text as virtual input to sync with react-hook-form
  register("text", { required: true, minLength: 1 });
  const text = watch("text");

  const handleEditorTextChange = (value: string) => {
    setValue("text", value);
  };

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    if (!text) return;

    const formData = new FormData();
    if (data.id) formData.set("id", data.id);
    formData.set("expiration", data.expiration);
    formData.set("text", text);

    const res = await fetch("/api/gist", { method: "POST", body: formData });

    if (res.ok) {
      const json = await res.json();
      setGistRes({ id: json.id, expiration: json.expiration });
      return;
    }

    if (res.status === 409) {
      setError(
        "id",
        {
          type: "custom",
          message: "ID already exists, choose a different one.",
        },
        { shouldFocus: true },
      );
    } else {
      setError("root", {
        type: "custom",
        message: `An error occured. Try Again. [${res.statusText}]`,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      {/* validation alerts */}
      {errors.id && errors.id.type === "custom" && (
        <Dialog variant="error">
          <span>{errors.id.message}</span>
        </Dialog>
      )}
      {errors.root && errors.root.type === "custom" && (
        <Dialog variant="error">
          <span>{errors.root.message}</span>
        </Dialog>
      )}
      {isSubmitSuccessful && (
        <Dialog variant="success" className="flex items-center">
          <div className="flex flex-col sm:flex-row sm:justify-between flex-wrap gap-y-2 w-full">
            <p>Gist published successfully.</p>
            <div className="flex gap-2 items-center text-sm">
              <Button>
                <Link
                  prefetch={shouldPrefetchGistResponse}
                  href={`/${gistRes.id}`}>
                  View Gist
                </Link>
              </Button>
              <Button onClick={() => reset()}>Write another</Button>
            </div>
          </div>
        </Dialog>
      )}

      {/* URL Bar */}
      <div className="flex text-sm font-mono rounded-md">
        <div
          className={cn(
            "bg-background-muted py-2 pl-4 pr-2 text-foreground-muted",
            "border border-default rounded-l-md flex items-center gap-2",
          )}>
          <p className="text-nowrap">{siteURL.hostname}/</p>
        </div>
        <input
          type="text"
          autoComplete="off"
          placeholder="enter gist url"
          className={cn(
            "border-y border-r border-default",
            "placeholder:text-white/30",
            "bg-background pl-2 w-full rounded-r-md focus-visible:outline-none",
            "focus-visible:outline-1 focus-visible:outline-offset-0",
            errors.id
              ? "focus-visible:outline-[--danger-fg] outline-1 outline outline-[--danger-fg]"
              : "focus-visible:outline-[--border-focus]",
          )}
          {...register("id", {
            minLength: {
              value: 3,
              message: "ID length cannot be less than 3 characters.",
            },
            maxLength: {
              value: 80,
              message: "ID length cannot be more than 80 characters wide.",
            },
            pattern: {
              value: /^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/,
              message:
                "ID should start and end with an alphanumeric character.",
            },
          })}
        />
      </div>

      {/* Editor */}
      <Editor value={text} onChange={handleEditorTextChange} />

      {/* Buttons */}
      <div className="flex justify-between flex-wrap gap-y-2">
        <Button className="p-0 pr-1">
          <select
            className="px-2 py-1 bg-inherit rounded-inherit select-none focus-visible:outline-none"
            {...register("expiration")}>
            <option value={EXPIRE.BURN_AFTER_READ}>Burn after read</option>
            <option value={EXPIRE.ONE_MINUTE}>Expires in 1 Minute</option>
            <option value={EXPIRE.ONE_HOUR}>Expires in 1 Hour</option>
            <option value={EXPIRE.ONE_DAY}>Expires in 1 Day</option>
            <option value={EXPIRE.ONE_WEEK}>Expires in 1 Week</option>
          </select>
        </Button>

        <button
          className={cn(
            "px-4 py-1 bg-[--primary-btn-bg] text-white rounded-md",
            "hover:bg-[--primary-btn-hover-bg]",
            "disabled:bg-[--primary-btn-disabled-bg] disabled:text-[--primary-btn-disabled-fg]",
            "transition-colors duration-200",
            (isSubmitting || !text.trim()) && "cursor-not-allowed",
          )}
          disabled={isSubmitting || !text.trim()}>
          {isSubmitting ? <Spinner /> : "Publish"}
        </button>
      </div>
    </form>
  );
};

export default Form;
