import { FilterQuery, Query } from 'mongoose';
class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  // //   search method
  search(searchableFields: string[]) {
    const searchTerm = this?.query?.search || this?.query?.searchTerm;
    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: { $regex: searchTerm, $options: 'i' },
            }) as FilterQuery<T>,
        ),
      });
    }

    return this;
  }

  filter() {
    const queryObj = { ...this.query };


    // Filtering
    const excludeFields = ['filter', 'search', 'sortBy', 'sortOrder', 'author', 'searchTerm', 'sort', 'limit', 'page', 'fields'];
    excludeFields.forEach((el) => delete queryObj[el]);

    if (this.query.author) {
      queryObj['author'] = this.query.filter;

    }
    // console.log("final query object filter mapping filter:", queryObj)
    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);

    return this;
  }

  //   sort method  sort by specific fields and order
  sort() {
    const sortBy = (this.query.sortBy as string) || 'createdAt';
    const sortOrder =
      (this.query.sortOrder as string)?.toLowerCase() === 'asc' ? '' : '-';
    this.modelQuery = this.modelQuery.sort(`${sortOrder}${sortBy}`);
    return this;
  }

  fields() {
    const fields =
      (this?.query?.fields as string)?.split(',')?.join(' ') || '-__v';

    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }
}

export default QueryBuilder;