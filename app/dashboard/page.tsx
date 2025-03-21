'use client';

import { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { getPosts, type Post } from '@/lib/posts';
import { useToast } from '@/hooks/use-toast';
import { useDebounce } from '@/hooks/use-debounce';

const ITEMS_PER_PAGE = 5;

const Skeleton = () => (
  <div className="animate-pulse">
    <div className="h-4 bg-gray-300 rounded mb-2 w-1/4"></div>
    <div className="h-4 bg-gray-300 rounded mb-2 w-3/4"></div>
    <div className="h-4 bg-gray-300 rounded mb-2 w-2/4"></div>
  </div>
);

export default function DashboardPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const debouncedSearch = useDebounce(searchTerm, 300);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts();
        setPosts(data);
        setFilteredPosts(data);
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to fetch posts. Please try again later.',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [toast]);

  useEffect(() => {
    const filtered = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        post.id.toString().includes(debouncedSearch)
    );
    setFilteredPosts(filtered);
    setCurrentPage(1);
  }, [debouncedSearch, posts]);

  const totalPages = Math.ceil(filteredPosts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedPosts = filteredPosts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const renderPagination = () => {
    const pages = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }

    return pages.map((page, idx) => (
      <PaginationItem key={idx}>
        {typeof page === 'number' ? (
          <PaginationLink
            onClick={() => setCurrentPage(page)}
            isActive={currentPage === page}
          >
            {page}
          </PaginationLink>
        ) : (
          <span className="px-2">...</span>
        )}
      </PaginationItem>
    ));
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </div>
    );
  }

  return (
    <div className="space-y-4 w-full">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Posts</h1>
        <Input
          type="search"
          placeholder="Search by title or ID..."
          className="max-w-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Content</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedPosts.map((post) => (
              <TableRow
                key={post.id}
                className="cursor-pointer"
              >
                <TableCell className="font-medium">{post.id}</TableCell>
                <TableCell>{post.title}</TableCell>
                <TableCell className="truncate max-w-md">{post.body}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
            />
          </PaginationItem>
          {renderPagination()}
          <PaginationItem>
            <PaginationNext
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
