import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import streamlit as st

"""
# Gender Gap in Tech - Data Analysis
"""
multiple_choice_responses = pd.read_csv(
    "./multiple_choice_responses.csv", low_memory=False
)

multiple_choice_responses["Q3"].replace(
    "United Kingdom of Great Britain and Northern Ireland",
    "United Kingdom",
    inplace=True,
)

genders = multiple_choice_responses[["Q2"]].drop(multiple_choice_responses.index[0])
gender_distr = (
    genders[(genders["Q2"] == "Female") | (genders["Q2"] == "Male")]
    .groupby("Q2")
    .agg({"Q2": "count"})
)

fig, ax = plt.subplots(1, 1, figsize=(10, 5))
ax.set_title("Gender Distribution")
ax.set(xlabel="Gender", ylabel="Respondents")
# sns.set(style="whitegrid")
ax = sns.barplot(["Female", "Male"], list(gender_distr["Q2"]), ax=ax, palette="mako")

"""

### Gender Distribution

We can clearly notice that the amount of women in technology is very low. Barring respondents who prefer not to reveal their gender, we have roughly 3000 women in comparison to 16000 men.
"""
st.pyplot(fig)

"""
---
### Gender Distribution by Age Group

Diving a little deeper into the demographics, we can infer that a significant percentage of the respondents is less than age 40. This gives you an idea that the majority of respondents are a part of the working class or students. 
"""

demographics = multiple_choice_responses[["Q1", "Q2", "Q3"]].drop(
    multiple_choice_responses.index[0]
)
demographics = demographics[
    (demographics["Q2"] == "Female") | (demographics["Q2"] == "Male")
]
demographics = demographics.rename(
    columns={"Q1": "Age_Group", "Q2": "Gender", "Q3": "Country"}
)

age = pd.crosstab(demographics["Age_Group"], demographics["Gender"])
age["Female"] = age["Female"].astype(float)
age["Male"] = age["Male"].astype(float)

totals = demographics.groupby("Age_Group").agg({"Gender": "count"})
fig, ax = plt.subplots(1, 1, figsize=(15, 5))
ax.set_title("Age Group Distribution")
ax.set(xlabel="Age Group", ylabel="Respondents")
ax = sns.barplot(totals.index, list(totals["Gender"]), ax=ax, palette="mako")
st.pyplot(fig)


for i in age.index:
    female = age.at[i, "Female"]
    male = age.at[i, "Male"]
    total = age.at[i, "Female"] + age.at[i, "Male"]
    age.at[i, "Female"] = round(female / total, 4)

age = age.drop(["Male"], axis=1)

"""
---
### Female Respondents by Age Group

It seems that there are fewer women in higher age groups, just as there are fewer older women in tech. 
"""
fig, ax = plt.subplots(1, 1, figsize=(15, 5))
ax.set_title("Female Respondents by Age Group (Percentage)")
ax.set(ylabel="Percentage")
sns.set(style="whitegrid")
ax = sns.barplot(age.index, list(age["Female"]), ax=ax, palette="mako")
st.pyplot(fig)


"""
---
## Gender Distribution by Country
A large chunk of responses come from India, US, UK, Canada and Germany, but a close look at the percentages in the second graph tells you that these numbers are fairly average even for these tech-savvy countries. While rather small countries show good percentage of women, the overall number is quite low that can mathemicatically impact that percentage. 
"""
loc = pd.crosstab(demographics["Country"], demographics["Gender"])
loc["Female"] = loc["Female"].astype(float)
loc["Male"] = loc["Male"].astype(float)

loc = loc.sort_values(by=["Female"], ascending=False)
fig, ax = plt.subplots(1, 1, figsize=(15, 30))
ax.set_title("Female Respondents by Location")
ax.set(xlabel="Counts")
sns.set(style="whitegrid")
ax = sns.barplot(loc["Female"], loc.index, ax=ax, palette="deep")
st.pyplot(fig)

for i in loc.index:
    female = loc.at[i, "Female"]
    male = loc.at[i, "Male"]
    total = loc.at[i, "Female"] + loc.at[i, "Male"]
    loc.at[i, "Female"] = round(female / total, 4)

loc = loc.drop(["Male"], axis=1)
loc = loc.sort_values(by=["Female"], ascending=False)

fig, ax = plt.subplots(1, 1, figsize=(15, 30))
ax.set_title("Female Respondents by Location (Percentage)")
ax.set(xlabel="Percentage")
sns.set(style="whitegrid")
ax = sns.barplot(list(loc["Female"]), loc.index, ax=ax, palette="deep")
st.pyplot(fig)

women = multiple_choice_responses[multiple_choice_responses["Q2"] == "Female"].copy()
men = multiple_choice_responses[multiple_choice_responses["Q2"] == "Male"].copy()

"""
---
## Career and Education
Let's take a look at what the respondent females do for a living in tech and their education backgrounds to give us a better insight on their careers and trends. 

"""

"""
### Job Titles
We see that majority of the respondents are still going through their education and there's a good number of women in data science roles. However we don't have a lot of women in leadership roles like Project Manager. 
"""

jobs = women.groupby("Q5", as_index=False).agg({"Q1": "count"})
jobs = jobs.rename(columns={"Q1": "Count", "Q5": "Job_Title"})
jobs = jobs.sort_values(by=["Count"], ascending=False)

fig, ax = plt.subplots(1, 1, figsize=(10, 10))
ax.set_title("Job Titles (Women only)")
sns.set(style="whitegrid")
ax = sns.barplot("Count", "Job_Title", ax=ax, palette="mako", data=jobs)
st.pyplot(fig)

"""
### Education
A good number of women have a Masters degree, which is a positive sign, while we can see that a majority of respondents have at least a bachelor's degree. 
"""

education = women.groupby("Q4", as_index=False).agg({"Q1": "count"})
education = education.rename(columns={"Q1": "Count", "Q4": "Education"}).sort_values(
    by=["Count"], ascending=False
)
education.replace(
    "Some college/university study without earning a bachelor’s degree",
    "Some college",
    inplace=True,
)
education.replace("No formal education past high school", "High School", inplace=True)
education.replace("I prefer not to answer", "No answer", inplace=True)


postgrad = ["Master’s degree", "Doctoral degree", "Professional degree"]
no_edu = ["Some college", "High School"]
education["Category"] = [
    "Postgrad"
    if x in postgrad
    else "No Degree"
    if x in no_edu
    else "Undergrad"
    if x == "Bachelor’s degree"
    else x
    for x in education["Education"]
]

edu_cat = education.groupby("Category", as_index=False).agg({"Count": "sum"})
edu_cat["Count"] = edu_cat["Count"].astype(float)
total = edu_cat["Count"].sum()

for i in edu_cat.index:
    count = edu_cat.at[i, "Count"]
    edu_cat.at[i, "Count"] = round(count / total, 4)

edu_cat = edu_cat.rename(columns={"Count": "Percentage"}).sort_values(
    by=["Percentage"], ascending=False
)


fig, ax = plt.subplots(1, 1, figsize=(10, 8))
ax.set_title("Degrees")
sns.set(style="whitegrid")
ax = sns.barplot("Count", "Education", ax=ax, palette="mako", data=education)
st.pyplot(fig)

"""
---
## Coding Experience

Coding Experience can be a reliable indicator of people's ability and their interest in working in tech. The trends show that most women are fairly new to coding, are still acquiring their skills and are new to their jobs.

"""

women["Q15"].replace("I have never written code", "None", inplace=True)
women["Q15"].replace(np.nan, "No answer", inplace=True)

code = women.groupby("Q15", as_index=False).agg({"Q1": "count"})
code = code.rename(columns={"Q1": "Count", "Q15": "Coding Experience"})
code = code.sort_values(by=["Count"], ascending=False)

fig, ax = plt.subplots(1, 1, figsize=(10, 5))
ax.set_title("Coding Experience")
sns.set(style="whitegrid")
ax = sns.barplot("Count", "Coding Experience", ax=ax, palette="mako", data=code)
st.pyplot(fig)

"""
### Categorizing experience into levels of expertise
Beginner: up to 2 years of experience\n
Intermediate: 3-5 years\n
Expert: >5 Years


"""

beginner = ["< 1 years", "1-2 years"]
mid = ["3-5 years"]
expert = ["5-10 years", "10-20 years", "20+ years"]

code["Level"] = [
    "Beginner"
    if x in beginner
    else "Intermediate"
    if x in mid
    else "Expert"
    if x in expert
    else x
    for x in code["Coding Experience"]
]

code_lvl = code.groupby("Level").agg({"Count": "sum"})
order = ["None", "Beginner", "Intermediate", "Expert", "No answer"]
code_lvl = code_lvl.reindex(order).reset_index()

total = code_lvl["Count"].sum()


fig, ax = plt.subplots(1, 1, figsize=(10, 5))
ax.set_title("Coding Level - Women")
sns.set(style="whitegrid")
ax = sns.barplot(
    "Level",
    "Count",
    ax=ax,
    palette="mako",
    data=code_lvl,
    estimator=lambda x: sum(x) / total * 100.0,
)
ax.set(ylabel="Percentage")
st.pyplot(fig)
"""
---
## Programming Languages

Both men and women have used Python considerably more, with similar results and patterns for R and SQL. 

"""
responses = women["Q1"].count()
responses_m = men["Q1"].count()
base = "Q18_Part_"
counts = dict()
counts_m = dict()

palette = dict()
colours = sns.color_palette("mako", 11)

for i in range(1, 12):
    col = base + str(i)
    count = women[col].count()
    count_m = men[col].count()
    lang = women[col].dropna().values[0]
    counts[lang] = count
    counts_m[lang] = count_m
    palette[lang] = colours[i - 1]


result = (
    pd.DataFrame.from_dict(counts, orient="index")
    .reset_index()
    .rename(columns={"index": "Language", 0: "Count"})
)
result = result.sort_values(by=["Count"], ascending=False)
result_m = (
    pd.DataFrame.from_dict(counts_m, orient="index")
    .reset_index()
    .rename(columns={"index": "Language", 0: "Count"})
)
result_m = result_m.sort_values(by=["Count"], ascending=False)

fig, ax = plt.subplots(1, 2, figsize=(18, 10))
sns.set(style="whitegrid")
sns.barplot(
    result["Count"],
    result["Language"],
    ax=ax[0],
    palette=palette,
    data=result,
    estimator=lambda x: sum(x) / responses * 100.0,
)
sns.barplot(
    result_m["Count"],
    result_m["Language"],
    ax=ax[1],
    palette=palette,
    data=result_m,
    estimator=lambda x: sum(x) / responses_m * 100.0,
)
for a in ax:
    a.set(ylabel="", xlabel="Percentage")
ax[0].set_title("Languages - Women")
ax[1].set_title("Languages - Men")
st.pyplot(fig)


"""
---
We're not done yet. We decided to interview Prachi Durge, who has abundance of experience of working in tech and other STEM fields.

## The Story of Prachi Durge

An Ambassador of Women TechMakers in Vadodara, Prachi is an inspirational woman working in tech with loads of experience under her belt.With a Math degree, she has explored different fields in STEM like Business Analysis, Process Executive, and she's currently working as an Android Developer with AVDEVS Solutions.

Talking about her experience, she highlighted her struggles in her initial days when she didn't have enough support from her seniors and she wasn't received very well when she herself was pursuing senior and leadership roles. She highlighted the importance of giving equal opportunities to everyone and creating a fair and growth-friendly environment.

As of today, Prachi leads workshops or mentor programs for women who are starting out in tech and she works with organizations to create more inclusive and supportive environments for women in workplaces. She truly is an inspiration.
"""
