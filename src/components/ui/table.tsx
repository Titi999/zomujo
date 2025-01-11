'use client';
import { cn } from '@/lib/utils';
import {
  ColumnDef,
  flexRender,
  functionalUpdate,
  getCoreRowModel,
  PaginationState,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';
import { Button } from './button';
import {
  forwardRef,
  HTMLAttributes,
  TdHTMLAttributes,
  ThHTMLAttributes,
  useEffect,
  useState,
} from 'react';
import { IPagination } from '@/types/shared.interface';
import { IDoctor } from '@/types/doctor.interface';

export type PaginationData = Omit<IPagination<IDoctor>, 'rows'>;
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  rowCount?: number;
  autoResetPageIndex?: boolean;
  manualPagination?: boolean;
  userPaginationChange?: (value: PaginationState) => void;
  columnVisibility?: VisibilityState;
  page?: number;
  pageCount?: number;
  paginationData?: PaginationData;
}

const Table = forwardRef<HTMLTableElement, HTMLAttributes<HTMLTableElement>>(
  ({ className, ...props }, ref) => (
    <div className="relative w-full overflow-auto">
      <table ref={ref} className={cn('w-full caption-bottom text-sm', className)} {...props} />
    </div>
  ),
);
Table.displayName = 'Table';

const TableHeader = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <thead ref={ref} className={cn('[&_tr]:border-b', className)} {...props} />
  ),
);
TableHeader.displayName = 'TableHeader';

const TableBody = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <tbody ref={ref} className={cn('[&_tr:last-child]:border-0', className)} {...props} />
  ),
);
TableBody.displayName = 'TableBody';

const TableFooter = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <tfoot
      ref={ref}
      className={cn('border-t bg-muted/50 font-medium [&>tr]:last:border-b-0', className)}
      {...props}
    />
  ),
);
TableFooter.displayName = 'TableFooter';

const TableRow = forwardRef<HTMLTableRowElement, HTMLAttributes<HTMLTableRowElement>>(
  ({ className, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn(
        'border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted',
        className,
      )}
      {...props}
    />
  ),
);
TableRow.displayName = 'TableRow';

const TableHead = forwardRef<HTMLTableCellElement, ThHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <th
      ref={ref}
      className={cn(
        'h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0',
        className,
      )}
      {...props}
    />
  ),
);
TableHead.displayName = 'TableHead';

const TableCell = forwardRef<HTMLTableCellElement, TdHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <td
      ref={ref}
      className={cn('p-4 align-middle [&:has([role=checkbox])]:pr-0', className)}
      {...props}
    />
  ),
);
TableCell.displayName = 'TableCell';

const TableCaption = forwardRef<HTMLTableCaptionElement, HTMLAttributes<HTMLTableCaptionElement>>(
  ({ className, ...props }, ref) => (
    <caption ref={ref} className={cn('mt-4 text-sm text-muted-foreground', className)} {...props} />
  ),
);
TableCaption.displayName = 'TableCaption';

export const TableData = <TData, TValue>({
  columns,
  data,
  rowCount = 10,
  autoResetPageIndex = false,
  manualPagination = true,
  userPaginationChange,
  columnVisibility,
  page,
  pageCount,
  paginationData,
}: DataTableProps<TData, TValue>) => {
  const [pagination, setPagination] = useState({
    pageIndex: page ? page - 1 : 0,
    pageSize: 1,
  });
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: manualPagination,
    rowCount,
    pageCount: paginationData ? paginationData.total : pageCount,
    autoResetPageIndex: autoResetPageIndex,
    onSortingChange: setSorting,
    onPaginationChange: (updater) => {
      const updatedPagination = (old: PaginationState) => functionalUpdate(updater, old);
      const updatedPaginationValues = updatedPagination(table.getState().pagination);

      setPagination(updatedPaginationValues);

      if (userPaginationChange) {
        userPaginationChange(updatedPaginationValues);
      }
    },
    state: {
      pagination: pagination,
      sorting: sorting,
      columnVisibility,
    },
  });

  const [record, setRecord] = useState({ startRecord: 1, endRecord: 10, total: 10 });
  const currentPage = table.getState().pagination.pageIndex + 1;

  useEffect(() => {
    if (page) {
      setPagination((prev) => ({
        ...prev,
        pageIndex: page - 1,
      }));
    }

    if (paginationData) {
      const { page, pageSize, total } = paginationData;
      const startRecord = (page - 1) * pageSize + 1;
      const endRecord = Math.min(page * pageSize, total);

      setRecord({
        startRecord,
        endRecord,
        total,
      });
    }
  }, [page, paginationData]);

  return (
    <>
      <div className="border-y">
        <Table>
          <TableHeader className="bg-gray-50 font-medium">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="text-black">
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className="text-sm font-medium text-gray-500"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="mr-2 flex items-center justify-between space-x-2 py-4">
        <div>
          <p className="text-sm text-gray-400">
            Showing {record.startRecord} to {record.endRecord} of {record.total} entries
          </p>
        </div>
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            child="Previous"
          />
          <span>{currentPage}</span>

          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={record.endRecord === record.total}
            child={'Next'}
          />
        </div>
      </div>
    </>
  );
};

export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption };
