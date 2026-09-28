import React from 'react';
import { PRODUCT_DATA } from '../data/productData.js';

export default function ProductSpecs() {
  const { specs } = PRODUCT_DATA;

  return (
    <section className="flex flex-col w-full px-margin py-space-md lg:px-8 lg:py-8 bg-surface-container-lowest shadow-sm lg:rounded-xl" id="specs">
      <div className="max-w-screen-xl mx-auto w-full">
        <div className="flex flex-col mb-3 lg:mb-6 lg:max-w-3xl lg:mx-auto">
          <h2 className="font-headline-sm text-headline-sm lg:text-headline-md text-on-surface font-extrabold flex items-center gap-1.5">
            <span className="material-symbols-outlined text-primary text-[24px] lg:text-[30px]">menu_book</span>
            <span>{specs.sectionTitle}</span>
          </h2>
          <p className="font-body-sm text-body-sm lg:text-body-md text-on-surface-variant mt-0.5 lg:mt-1">
            {specs.sectionDesc}
          </p>
        </div>

        {/* Specs Table */}
        <div className="border border-outline-variant rounded-xl overflow-hidden shadow-sm lg:max-w-3xl lg:mx-auto">
          <table className="w-full text-left font-body-sm text-body-sm lg:text-body-md">
            <caption className="sr-only">Bảng thông số kỹ thuật sản phẩm Bánh Tráng Cô Út</caption>
            <tbody className="divide-y divide-outline-variant">
              {specs.rows.map((row, index) => {
                const isEven = index % 2 === 0;
                const rowBg = isEven ? 'bg-surface-container-low' : 'bg-surface-container-lowest';

                // Specific styling for highlighted values like Hạn sử dụng or Chứng nhận
                let valueClasses = 'py-2.5 px-3 lg:py-3.5 lg:px-5 text-on-surface-variant';
                if (row.label === 'Hạn sử dụng') {
                  valueClasses = 'py-2.5 px-3 lg:py-3.5 lg:px-5 text-on-surface-variant font-semibold text-primary';
                } else if (row.label === 'Chứng nhận chất lượng') {
                  valueClasses = 'py-2.5 px-3 lg:py-3.5 lg:px-5 text-secondary font-bold';
                }

                return (
                  <tr key={index} className={rowBg}>
                    <th className={`py-2.5 px-3 lg:py-3.5 lg:px-5 font-bold text-on-surface ${index === 0 ? 'w-1/3' : ''}`} scope="row">
                      {row.label}
                    </th>
                    <td className={valueClasses}>
                      {row.value}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
