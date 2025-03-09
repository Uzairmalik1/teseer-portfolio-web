import {blockContentType} from './blockContentType'
import {categoryType} from './categoryType'
import {postType} from './postType'
import {authorType} from './authorType'
import { projects } from './projects'
import skills from './skills'

export const schema = {
  types: [blockContentType, categoryType, postType, authorType, projects, skills],
}
