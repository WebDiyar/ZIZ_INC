'use client';
import { Pagination } from 'antd';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const PaginationComponent: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div className="flex justify-center w-full mt-4">
            <Pagination
                current={currentPage}
                total={totalPages * 10}
                onChange={onPageChange}
                className="w-full md:w-auto"
            />
        </div>
    );
};

export default PaginationComponent;
