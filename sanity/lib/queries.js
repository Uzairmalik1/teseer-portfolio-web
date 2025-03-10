export const PROJECT_QUERIES = `*[_type == "project"] | order(_createdAt desc){
    title,
    description,
    tools,
    demo   
  }`;

  
export const BLOG_QUERIES = `*[_type == "post"] | order(_createdAt desc){
    title,
    slug,
    mainImage{
        asset->{url}
      },
    body,
    _createdAt,
    "author": author ->{ 
        name, 
        email, 
        image{
              asset->{url}
          }, 
        bio,},
    "categories": categories[]->{ title, slug, description }
  }`;


  export const SKILLS_QUERIES = `*[_type == "skill"]{
    _id,
    name,
    image{
              asset->{url}
          }, 
    alt
  }`;